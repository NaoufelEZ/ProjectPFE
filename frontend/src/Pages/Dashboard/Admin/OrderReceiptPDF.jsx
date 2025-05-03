import React from 'react';
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
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  title: { backgroundColor: '#fff8dc', textAlign: 'center', fontSize: 18, fontWeight: 'bold', padding: 10, marginBottom: 20 },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 2 },
  table: { marginTop: 15, borderWidth: 1, borderColor: '#999' },
  tableRow: { flexDirection: 'row' },
  tableHeader: { backgroundColor: '#eee', fontWeight: 'bold' },
  tableCell: { borderRight: '1 solid #999', padding: 5, flex: 1 },
  lastTableCell: { padding: 5, flex: 1 },
  totalSection: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },
  totalText: { fontSize: 12, fontWeight: 'bold' },
});

const OrderReceiptPDF = ({ order }) => {
  const total = order.order_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const user = order.user || {};
  const address = order.address || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Order Receipt</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Shipping Address:</Text>
          <Text>Name: {user.first_name} {user.last_name}</Text>
          <Text>Phone: {user.phone || 'N/A'}</Text>
          <Text>City: {address.state || 'N/A'}</Text>
          <Text>Street: {address.street || 'N/A'}</Text>
          <Text>Address: {address.address || 'N/A'}</Text>
          <Text>Zip: {address.zip || 'N/A'}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.lastTableCell}>Total</Text>
          </View>
          {order.order_items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.product_stock.product.title}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>TND {item.price.toFixed(2)}</Text>
              <Text style={styles.lastTableCell}>TND {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total: TND {total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderReceiptPDF;
