/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

export const ReceiptEmail = ({ booking }: { booking: any }) => {
  const containerStyle = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    padding: '40px 0',
  };

  const contentStyle = {
    backgroundColor: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Banner */}
        <div style={{ backgroundColor: '#1a1a1a', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#d4af37', margin: 0, letterSpacing: '4px', fontSize: '24px', textTransform: 'uppercase' }}>
            The Grand Luxe
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ color: '#333', fontSize: '20px' }}>Reservation Confirmed</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Dear {booking.user.name}, your stay at The Grand Luxe is officially confirmed. 
            We are preparing your {booking.room.type.toLowerCase()} for your arrival.
          </p>

          <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #eee', borderRadius: '4px' }}>
            <table style={{ width: '100%' }}>
              <tr>
                <td style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>Room</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{booking.room.roomNumber}</td>
              </tr>
              <tr>
                <td style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase', paddingTop: '10px' }}>Dates</td>
                <td style={{ textAlign: 'right', paddingTop: '10px' }}>
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </td>
              </tr>
            </table>
          </div>

          <a 
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}
            style={{ 
              display: 'block', 
              backgroundColor: '#1a1a1a', 
              color: '#d4af37', 
              padding: '16px', 
              textAlign: 'center', 
              textDecoration: 'none', 
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            MANAGE YOUR STAY
          </a>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4', color: '#999', fontSize: '12px' }}>
          Questions? Contact our 24/7 Concierge at +1 (800) LUXE-STAY
        </div>
      </div>
    </div>
  );
};