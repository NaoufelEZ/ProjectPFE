<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CategoryDetails;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\Subcategories;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    // Public routes
    public function index($cat, $subcat, $detail)
    {
        $wordDetail = strtolower($detail) == "t-shirts" ? "T-SHIRTS" : str_replace("-", " ", $detail);
        $categoryId = Categories::where("category", $cat)->first();
        
        if(!$categoryId) {
            return response()->json(["data" => "Category not found", "status" => 404], 404);
        }

        $subcategoryId = Subcategories::where("subcategories", $subcat)
            ->where("category_id", $categoryId->id)
            ->first();

        if(!$subcategoryId) {
            return response()->json(["data" => "Subcategory not found", "status" => 404], 404);
        }

        $detailId = CategoryDetails::where("categoryDetails", $wordDetail)
            ->where("category_id", $categoryId->id)
            ->where("subcategory_id", $subcategoryId->id)
            ->first();

        if(!$detailId) {
            return response()->json(["data" => "Category detail not found", "status" => 404], 404);
        }

        $products = Product::with('productStock')->where("details_id", $detailId->id)->get();
        
        return $products->isEmpty()
            ? response()->json(["data" => "No products found", "status" => 404], 404)
            : response()->json(["data" => $products, "status" => 200], 200);
    }

    public function new($cat)
    {
        $products = Product::with(["details.category", "productStock"])
            ->whereHas('details.category', function($query) use ($cat) {
                $query->where('category', $cat);
            })
            ->latest('created_at')
            ->get();
        
        return response()->json(["data" => $products, "status" => 200], 200);
    }

    public function subcategory($cat, $sub)
    {
        $products = Product::with(['details.category', 'details.subcategory', 'productStock'])
            ->whereHas('details', function ($query) use ($cat, $sub) {
                $query->whereHas('category', function ($q) use ($cat) {
                    $q->where('category', $cat);
                })->whereHas('subcategory', function ($q) use ($sub) {
                    $q->where('subcategories', $sub);
                });
            })
            ->latest('created_at')
            ->get();

        return response()->json(["data" => $products, "status" => 200], 200);
    }

    public function product($id)
    {
        try {
            $product = Product::with("productStock", "details.category", "details.subcategory")
                ->findOrFail($id);
            
            return response()->json(["data" => $product, "status" => 200], 200);

        } catch (\Exception $e) {
            return response()->json(["data" => "Product not found", "status" => 404], 404);
        }
    }

    public function roleIndex()
    {
        $products = Product::with(["productStock","details"])->get();
        
        return $products->isEmpty()
            ? response()->json(["message" => "No products found", "status" => 404], 404)
            : response()->json(["message" => "Success", "data" => $products, "status" => 200], 200);
    }

    // Protected admin routes
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                "title" => "required|string|min:3",
                "description" => "required|string|min:3",
                "price" => "required|numeric",
                "discount" => "numeric",
                "details_id" => "required|numeric",
                "colors" => "required|array",
                "sizes" => "required|array",
                "quantity" => "required|array",
                "product_pictures" => "required|array",
                "holder_pictures" => "required|array",
            ]);

            $product = Product::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'discount' => $validated['discount'] ?? 0,
                'details_id' => $validated['details_id'],
            ]);

            foreach ($validated['colors'] as $index => $color) {
                $productFile = $this->uploadImage($validated['product_pictures'][$index]);
                $holderFile = $this->uploadImage($validated['holder_pictures'][$index]);

                ProductStock::create([
                    'product_id' => $product->id,
                    'color' => $color,
                    'product_picture' => $productFile,
                    'holder_product_picture' => $holderFile,
                    'size' => $validated['sizes'][$index],
                    'quantity' => $validated['quantity'][$index],
                ]);
            }

            return response()->json([
                "data" => "Product created successfully",
                "status" => 201
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(["data" => $e->errors(), "status" => 422], 422);
        } catch (\Exception $e) {
            return response()->json(["data" => $e->getMessage(), "status" => 500], 500);
        }
    }

    public function update(Request $request, $id)
{
    try {
        $validated = $request->validate([
            "title" => "required|string|min:3",
            "description" => "required|string|min:3",
            "price" => "required|numeric",
            "discount" => "numeric",
            "details_id" => "required|numeric",
            "colors" => "required|array",
            "sizes" => "required|array",
            "quantity" => "required|array",
            "stock_id" => "sometimes|array",
            "existing_product_pictures" => "required_without:product_pictures|array",
            "existing_holder_pictures" => "required_without:holder_pictures|array",
            "product_pictures.*" => "sometimes|image|mimes:jpeg,png,jpg,webp|max:2048",
            "holder_pictures.*" => "sometimes|image|mimes:jpeg,png,jpg,webp|max:2048",
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        $existingStockIds = $product->productStock->pluck('id')->toArray();
        $updatedStockIds = [];

        foreach ($validated['colors'] as $index => $color) {
            $stockData = [
                'color' => $color,
                'size' => $validated['sizes'][$index],
                'quantity' => $validated['quantity'][$index],
            ];

            // Handle product image (either new or existing)
            if ($request->hasFile("product_pictures.{$index}")) {
                $stockData['product_picture'] = $this->uploadImage(
                    $request->file("product_pictures.{$index}")
                );
            } elseif (isset($validated['existing_product_pictures'][$index])) {
                $stockData['product_picture'] = $validated['existing_product_pictures'][$index];
            } else {
                throw new \Exception("Product image is required for color: {$color}");
            }

            // Handle holder image (either new or existing)
            if ($request->hasFile("holder_pictures.{$index}")) {
                $stockData['holder_product_picture'] = $this->uploadImage(
                    $request->file("holder_pictures.{$index}")
                );
            } elseif (isset($validated['existing_holder_pictures'][$index])) {
                $stockData['holder_product_picture'] = $validated['existing_holder_pictures'][$index];
            } else {
                $stockData['holder_product_picture'] = null; // Optional field
            }

            // Update or create stock
            if (!empty($validated['stock_id'][$index])) {
                $stock = ProductStock::find($validated['stock_id'][$index]);
                if ($stock) {
                    $stock->update($stockData);
                    $updatedStockIds[] = $stock->id;
                }
            } else {
                $newStock = $product->productStock()->create($stockData);
                $updatedStockIds[] = $newStock->id;
            }
        }

        // Delete removed stocks
        $toDelete = array_diff($existingStockIds, $updatedStockIds);
        if (!empty($toDelete)) {
            ProductStock::destroy($toDelete);
        }

        return response()->json([
            "data" => "Product updated successfully",
            "status" => 200
        ], 200);

    } catch (ValidationException $e) {
        return response()->json(["data" => $e->errors(), "status" => 422], 422);
    } catch (\Exception $e) {
        return response()->json(["data" => $e->getMessage(), "status" => 500], 500);
    }
}

    public function delete($id)
    {
        try {
            $product = Product::findOrFail($id);

            // Delete associated images
            foreach ($product->productStock as $stock) {
                $this->deleteImage($stock->product_picture);
                $this->deleteImage($stock->holder_product_picture);
            }

            $product->delete();

            return response()->json([
                "message" => "Product deleted successfully",
                "status" => 200
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "message" => "Product not found",
                "status" => 404
            ], 404);
        }
    }

    // Image handling helpers
    private function uploadImage($file)
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = time() . '_' . uniqid() . '.' . $extension;
        $file->move(public_path('images/products'), $fileName);
        return $fileName;
    }

    private function deleteImage($filename)
    {
        $path = public_path("images/products/{$filename}");
        if (file_exists($path)) {
            unlink($path);
        }
    }
}