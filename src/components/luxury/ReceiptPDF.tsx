/* eslint-disable @typescript-eslint/no-explicit-any */

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Note: In production, you would register custom fonts for a 5-star feel
const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: "#FFFFFF", fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 20,
  },
  hotelName: {
    fontSize: 24,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1A1A1A",
  },
  statusBadge: {
    backgroundColor: "#F59E0B",
    color: "white",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 10,
  },
  section: { marginBottom: 25 },
  label: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: { fontSize: 14, color: "#1E293B" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { width: "50%", marginBottom: 15 },
  table: { marginTop: 20, borderTop: 1, borderTopColor: "#F1F5F9" },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottom: 1,
    borderBottomColor: "#F1F5F9",
  },
  totalLabel: { fontSize: 16, fontWeight: "bold" },
  totalValue: { fontSize: 20, color: "#B45309" },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 9,
  },
});

export const ReceiptPDF = ({ booking }: { booking: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hotelName}>The Grand Luxe</Text>
        <Text style={styles.statusBadge}>PAID & CONFIRMED</Text>
      </View>

      {/* Guest Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Guest Name</Text>
        <Text style={styles.value}>{booking.user.name}</Text>
      </View>

      {/* Stay Details */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Room Number</Text>
          <Text style={styles.value}>
            {booking.room.roomNumber} ({booking.room.type})
          </Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Booking ID</Text>
          <Text style={styles.value}>
            #{booking.id.slice(-8).toUpperCase()}
          </Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Check-In</Text>
          <Text style={styles.value}>
            {new Date(booking.checkIn).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Check-Out</Text>
          <Text style={styles.value}>
            {new Date(booking.checkOut).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Payment Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={{ fontSize: 12 }}>Accommodation Charges</Text>
          <Text style={{ fontSize: 12 }}>${booking.totalPrice.toFixed(2)}</Text>
        </View>
        <View style={[styles.tableRow, { borderBottom: 0, marginTop: 10 }]}>
          <Text style={styles.totalLabel}>Total Amount Paid</Text>
          <Text style={styles.totalValue}>
            ${booking.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for choosing The Grand Luxe. Please present this receipt upon
        arrival.
        {"\n"}123 Opulence Blvd, Luxury City • www.thegrandluxe.com
      </Text>
    </Page>
  </Document>
);
