"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contact.length !== 10 || isNaN(parseInt(formData.contact))) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    try {
      const res = await axios.post("/api/users", formData);
      if (res.status === 200) {
        toast({ title: "All the best for your quiz!" });
        localStorage.setItem("users", JSON.stringify(formData));
        router.push("/SITQUIZ");
      }
    } catch (error) {
      toast({ title: JSON.stringify(error?.response?.data?.error || error.message), variant: "destructive" });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Section with Logo & Text */}
      <div className="w-1/2 bg-yellow-300 flex flex-col justify-center items-center p-8 h-full">
        <Image src="/backdrop.png" alt="Backdrop" width={400} height={300} />
        <h1 className="text-3xl font-bold text-blue-900 mt-4">SUVIDYA'S CHEMTECH QUIZ</h1>
        <p className="italic text-gray-700 text-lg">Only for students and fresh graduates.</p>
      </div>

      {/* Right Section with Full-Height Form */}
      <div className="w-1/2 flex justify-center items-center bg-white h-full">
        <div className="bg-white p-10 rounded-xl shadow-lg w-[450px] border border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-lg font-semibold">NAME:</Label>
              <Input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="contact" className="block text-lg font-semibold">PHONE NUMBER:</Label>
              <Input type="tel" name="contact" placeholder="Enter your phone number" value={formData.contact} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="type" className="block text-lg font-semibold">ARE YOU:</Label>
              <Select required onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-300 z-50">
                <SelectItem value="iti">ITI Student</SelectItem>
                <SelectItem value="diploma">Diploma Student</SelectItem>
                <SelectItem value="btech">B.Tech / B.E. Student</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="bg-blue-500 font-bold px-6 py-3 rounded-lg transition duration-300">
                Continue →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;