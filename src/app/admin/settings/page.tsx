"use client";

import { HOTEL_INFO } from "@/lib/data";
import { resetHotelStore } from "@/context/HotelContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage hotel configuration and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hotel Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Hotel Name" defaultValue={HOTEL_INFO.name} />
            <Input label="Tagline" defaultValue={HOTEL_INFO.tagline} />
            <Input label="Address" defaultValue={HOTEL_INFO.address} />
            <Input label="Phone" defaultValue={HOTEL_INFO.phone} />
            <Input label="Email" defaultValue={HOTEL_INFO.email} type="email" />
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Check-in Time" defaultValue="3:00 PM" />
            <Input label="Check-out Time" defaultValue="11:00 AM" />
            <Input label="Cancellation Policy (hours)" defaultValue="24" type="number" />
            <Input label="Tax Rate (%)" defaultValue="12" type="number" />
            <Button>Save Policies</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
              <span className="text-sm text-navy-800">Email confirmation on new bookings</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
              <span className="text-sm text-navy-800">Alert on pending check-ins</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
              <span className="text-sm text-navy-800">Daily revenue report</span>
            </label>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              All booking data is stored locally in your browser. Clear data to reset to defaults.
            </p>
            <Button
              variant="danger"
              onClick={() => {
                resetHotelStore();
                window.location.reload();
              }}
            >
              Reset All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
