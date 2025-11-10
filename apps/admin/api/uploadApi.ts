import axios from "axios";
// export async function uploadImage(
//   formData: FormData,
//   progress: (number) => void
// ) {
//   await axios.post("http://localhost:4000/api/v1/upload", formData, {
//     onUploadProgress: (data: AxiosProgressEvent) => {
//       progress((data.loaded / data.total) * 100);
//     },
//   });
// }
export async function deleteImage(url: string) {
  const { data } = await axios.delete("http://localhost:4000/api/v1/upload", {
    data: { url },
  });

  return data;
}
