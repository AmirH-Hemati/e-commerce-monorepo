"use client";
import { deleteImage } from "@/api/uploadApi";
import { Progress } from "@/components/ui/progress";
import { Product } from "@repo/validation";
import axios, { AxiosProgressEvent } from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
export default function InputFile({
  form,
  color,
  isEditSession,
}: {
  form: UseFormReturn<Product>;
  color: string;
  isEditSession: boolean;
}) {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const handelUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] || "";

    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/upload",
      formData,
      {
        onUploadProgress: (data: AxiosProgressEvent) => {
          setProgress((data.loaded / data.total) * 100);
        },
      }
    );

    const images = [...(form.getValues("images") || [])];
    const newImage = { color, image: data.link };
    images.push(newImage);
    form.setValue("images", images);
    setUrl(data.link);
  };

  async function handelDeleteImage() {
    await deleteImage(url);
    const images = form.getValues("images");
    delete images[color];
    form.setValue("images", images);
    setUrl("");
    setProgress(0);
  }
  return (
    <div className="flex items-center gap-2">
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          required={isEditSession ? false : true}
          onChange={handelUploadImage}
        />
        {progress > 0 && <Progress value={progress} />}
      </div>
      {progress > 0 && url && (
        <div onClick={handelDeleteImage} className="cursor-pointer ">
          <X />
        </div>
      )}
    </div>
  );
}
