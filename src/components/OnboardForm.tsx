"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FaBuilding, FaHome, FaWarehouse, FaTractor } from "react-icons/fa";

const communityOptions = [
  { type: "Apartment", label: "Apartment", icon: <FaBuilding size={40} /> },
  { type: "Villa", label: "Villa", icon: <FaHome size={40} /> },
  { type: "Standalone", label: "Standalone", icon: <FaWarehouse size={40} /> },
  { type: "FarmPlot", label: "Farm Plot", icon: <FaTractor size={40} /> },
];

const steps = [
  { id: 1, label: "Community Info" },
  { id: 2, label: "Configuration" },
  { id: 3, label: "Residents & Amenities" },
];

export default function OnboardForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "Apartment",
    name: "",
    address: "",
    location: { lat: 17.385044, lng: 78.486671 },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const geocodeLatLng = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setFormData((prev) => ({
          ...prev,
          address: results[0].formatted_address,
        }));
      }
    });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() ?? 0;
    const lng = e.latLng?.lng() ?? 0;
    setFormData((prev) => ({
      ...prev,
      location: { lat, lng },
    }));
    geocodeLatLng(lat, lng);
  };

  const goToStep2 = () => {
    if (!formData.name || !formData.address) {
      alert("Please fill in the community name and select an address.");
      return;
    }
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-center mb-8">
        <div className="flex gap-6">
          {steps.map((s, index) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : isCompleted
                      ? "border-green-500 text-green-500"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : s.id}
                </div>
                <span
                  className={`text-sm ${
                    isActive ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-6 h-px bg-gray-300 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {step === 1
              ? "Step 1: Community Type & Info"
              : "Step 2: Community Configuration"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form className="space-y-6">
              <div>
                <Label className="text-lg mb-2 block text-gray-700">
                  Select Community Type
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {communityOptions.map((option) => (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, type: option.type }))
                      }
                      className={`border rounded-xl p-6 min-h-[140px] flex flex-col items-center justify-center text-center transition hover:shadow-md text-lg font-medium ${
                        formData.type === option.type
                          ? "border-blue-600 bg-blue-50 shadow-lg"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <div className="text-blue-600 mb-2">{option.icon}</div>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg text-gray-700 mb-1">
                  Community Name
                </Label>
                <Input
                  className="h-12 text-lg px-4"
                  placeholder="e.g. Sree Enclave"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label className="text-lg text-gray-700 mb-1">
                  Address (Pick from Map)
                </Label>
                <Input
                  value={formData.address}
                  placeholder="Click a location on the map below"
                  readOnly
                  className="h-12 text-lg px-4"
                />
              </div>

              {isLoaded && (
                <div className="h-[350px] md:h-[400px] rounded border overflow-hidden">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={formData.location}
                    zoom={15}
                    onClick={handleMapClick}
                  >
                    <Marker position={formData.location} />
                  </GoogleMap>
                </div>
              )}

              <Button
                type="button"
                className="h-12 text-lg w-full mt-6"
                onClick={goToStep2}
              >
                Continue to Step 2 →
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="text-center text-gray-600">
              <p className="text-lg">
                Step 2: Configure your <strong>{formData.type}</strong>{" "}
                community layout
              </p>
              <Button
                variant="outline"
                className="mt-6 text-lg"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

