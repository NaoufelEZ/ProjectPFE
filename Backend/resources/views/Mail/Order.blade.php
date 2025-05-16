<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Update - Order #ORD-{{ $order->id }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
        .status { font-weight: bold; padding: 10px; border-radius: 5px; text-align: center; }
        .pending { background-color: #ffcc00; }
        .processing { background-color: #0099ff; color: white; }
        .shipped { background-color: #ff9900; color: white; }
        .delivered { background-color: #28a745; color: white; }
        .cancelled { background-color: #dc3545; color: white; }
        .return { background-color: #6c757d; color: white; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello {{ $order->user->first_name }},</h2>
        <p>We wanted to update you on the status of your order <strong>#ORD-{{ $order->id }}</strong>.</p>
        
        <p>Your order is currently:</p>
        <div class="status {{ strtolower($orderStatus) }}">
            {{ ucfirst($orderStatus) }}
        </div>

        <h3>Order Details:</h3>
        <p><strong>Payment Method:</strong> {{ $order->method_payment }}</p>
        <p><strong>Delivery Fee Paid:</strong> {{ $order->delivery_pay ? 'Yes' : 'No' }}</p>
        <p><strong>Order Date:</strong> {{ $order->order_date }}</p>
        
        <h3>Shipping Address:</h3>
        <p>{{ $order->address->state }}, {{ $order->address->address }}, {{ $order->address->zip }}, {{ $order->address->street }}</p>

        <h3>Items Ordered:</h3>
        <ul>
            @foreach($orderItems as $item)
                <li>
                    <strong>Quantity:</strong> {{ $item->quantity }} 
                    <strong>Color:</strong> {{ $item->product_stock->color }} 
                    <strong>Size:</strong> {{ $item->product_stock->size }} 
                    <strong>Price:</strong> {{ $item->price }} TND
                </li>
                <hr>
            @endforeach
        </ul>

        <p><strong>Fee:</strong> {{ $order->delivery_pay ? 9.9 : 0 }} TND</p>
        <p><strong>Total Price:</strong> {{ $orderItems->sum(fn($item) => $item->quantity * $item->price) + ($order->delivery_pay ? 9.9 : 0) }} TND</p>

        <p>If you have any questions, please contact our support team.</p>
        
        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>&copy; 2025 Your Nalouati Store</p>
        </div>
    </div>
</body>
</html>
