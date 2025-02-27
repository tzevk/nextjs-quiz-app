import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

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
    typeof window !== "undefined" && localStorage.removeItem("user");
    typeof window !== "undefined" && localStorage.removeItem("questions");
    typeof window !== "undefined" && localStorage.removeItem("timeRemaining");

    if (
      formData.contact.length !== 10 ||
      isNaN(parseInt(formData.contact)) ||
      !/^\d+$/.test(formData.contact)
    ) {
      toast({
        title: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.post("/api/users", formData);
      if (res.status === 200) {
        toast({ title: "All the best for your quiz!" });
        typeof window !== "undefined" &&
          localStorage.setItem("user", JSON.stringify(formData));
        router.push("/quiz");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: JSON.stringify(error?.response?.data?.error || error.message),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-gray-300">
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <Label htmlFor="name" className="block font-bold text-zinc-900 mb-2 text-left">
            NAME:
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 rounded-lg placeholder-gray-500 text-lg"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <Label htmlFor="contact" className="block font-bold text-zinc-900 mb-2 text-left">
            PHONE NUMBER:
          </Label>
          <Input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 rounded-lg placeholder-gray-500 text-lg"
            required
          />
        </div>

        {/* Selection Field */}
        <div className="mb-4">
          <Label htmlFor="occupation" className="block font-bold text-zinc-900 mb-2 text-left">
            ARE YOU:
          </Label>
          <Select
            required
            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
          >
            <SelectTrigger className="w-full rounded-lg border-2 px-4 py-3 text-lg">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent className="absolute z-50 mt-1 bg-white shadow-lg rounded-md border">
              <SelectItem className="bg-white" value="iti">
                HSC Other Graduates
              </SelectItem>
              <SelectItem value="diploma">Diploma Student</SelectItem>
              <SelectItem value="btech">Graduate Engineers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-[#2A6BB5] hover:bg-[#23589b] text-white font-bold text-lg px-8 py-3 rounded-lg transition duration-300 flex items-center gap-2 shadow-md"
          >
            Continue →
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;