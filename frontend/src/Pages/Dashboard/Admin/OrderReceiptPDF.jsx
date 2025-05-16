import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  logo: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
  },
  customerInfo: {
    fontSize: 10,
    marginBottom: 10,
  },
  orderInfo: {
    fontSize: 10,
    textAlign: 'right',
  },
  paymentMethod: {
    fontSize: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    fontSize: 9,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
    fontSize: 9,
  },
  descriptionCol: {
    width: '45%',
  },
  referenceCol: {
    width: '25%',
  },
  sizeCol: {
    width: '10%',
    textAlign: 'center',
  },
  pcsCol: {
    width: '10%',
    textAlign: 'center',
  },
  amountCol: {
    width: '10%',
    textAlign: 'right',
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5,
  },
  stamp: {
    textAlign: 'center',
    color: '#0070C0',
    fontSize: 10,
    marginVertical: 20,
    transform: 'rotate(-5deg)',
    opacity: 0.7,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  summaryLabels: {
    fontSize: 9,
    textAlign: 'right',
    marginRight: 20,
  },
  summaryValues: {
    fontSize: 9,
    textAlign: 'right',
    width: 60,
  },
  total: {
    fontWeight: 'bold',
  },
  note: {
    fontSize: 8,
    marginVertical: 10,
  },
  barcode: {
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
  }
});

const OrderReceiptPDF = ({ order }) => {
  const total = order.order_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const user = order.user || {};
  const address = order.address || {};
  const companyAddress = order.company?.address.split(",") || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Logo */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>Nalouti Store</Text>
      </View>

       <View style={styles.header}>
        <Text style={styles.title}>Delivery Note</Text>
      </View>

         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.customerInfo}>
          <Text>{user.first_name} {user.last_name}</Text>
          <Text>{address.state || 'N/A'},{address.city || 'N/A'}</Text>
          <Text>{address.zip || 'N/A'} - {address.street || 'N/A'}</Text>
          <Text>{address.state || 'N/A'}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text>ORDER</Text>
          <Text>Num: {order.id}</Text>
          <Text>Date:{order.order_date}</Text>
          <Text>PAGE 1/1</Text>
          <Text>Store: 14650</Text>
          <Text>COMP. NAME: {order.company?.name}</Text>
          <Text>VAT: 1264642B/B/M</Text>
          <Text>ADDRESS: {companyAddress && companyAddress[3]}</Text>
          <Text>{companyAddress && companyAddress[4]}</Text>
          <Text>{companyAddress && companyAddress[companyAddress.length - 1]}</Text>
        </View>
      </View>

      <View style={styles.paymentMethod}>
        <Text>Payment method: {order.method_payment}</Text>
      </View>



       <View>
        <View style={styles.tableHeader}>
          <Text style={styles.descriptionCol}>RET DESCRIPTION</Text>
          <Text style={styles.referenceCol}>REFERENCE</Text>
          <Text style={styles.sizeCol}>SIZE</Text>
          <Text style={styles.pcsCol}>PCS</Text>
          <Text style={styles.amountCol}>AMOUNT TND</Text>
        </View>
        {order.order_items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={{ flexDirection: 'row', width: '45%' }}>
            <View style={styles.checkbox}></View>
            <Text>{item.product_stock.product.title}</Text>
          </View>
          <Text style={styles.referenceCol}>{order.reference}</Text>
          <Text style={styles.sizeCol}>{item.product_stock.size}</Text>
          <Text style={styles.pcsCol}>{item.quantity}</Text>
          <Text style={styles.amountCol}>{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
            ))}
      </View>


            <View style={{ alignItems: 'flex-end', marginVertical: 10 }}>
        <Text style={{ fontSize: 9 }}>UNITS {order?.length}</Text>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryLabels}>
          <Text>SUBTOTAL</Text>
          <Text>SHIPPING</Text>
          <Text> </Text>
          <Text style={styles.total}>TOTAL</Text>
        </View>
        <View style={styles.summaryValues}>
          <Text>{total.toFixed(2)}</Text>
          <Text>9.90</Text>
          <Text>0.00</Text>
          <Text style={styles.total}>{(total + 9.9).toFixed(2)}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 8, textAlign: 'right' }}>*Sales Taxes incl.</Text>

      {/* Note */}
      <View style={styles.note}>
        <Text>This receipt is essential in order to receive a refund or exchange items. Please remember that the easiest way to return an item is in one of our stores. More information on www.naloutistore.com: Buying guide, Returns.</Text>
      </View>

      {/* Website */}
      <View style={styles.footer}>
        <Text>w w w . N a l o u t i S t o r e . c o m</Text>
      </View>

      {/* Barcode */}
      <View style={styles.barcode}>
        <Text>|||||||||||||||||||||||||||||||||||||||||||||</Text>
        <Text style={{ fontSize: 8 }}>9941040184017975014650</Text>
      </View>
      </Page>
    </Document>
  );
};

export default OrderReceiptPDF;
