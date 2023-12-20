import { useDeploy } from "../../providers/DeployContext";

const CoverArtUploadButton = () => {
  const { setCover, cover } = useDeploy();
  const imageUrl = cover ? URL.createObjectURL(cover) : null;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.includes("image")) {
      setCover(file);
      return;
    }
  };

  return (
    <button
      className={`bg-cover border-[1px] border-white
      rounded-[10px]
      overflow-hidden
      ${cover ? "w-[300px] h-[200px]" : "w-[298px] h-[35px]"}
      flex items-center justify-center`}
      style={{
        backgroundImage: cover
          ? "url('/images/Create/Post/m_file_input.png')"
          : "url('/images/Create/Post/m_art_upload_bg.png')",
      }}
    >
      <label className="font-monument_extended text-[10px] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {cover ? <img src={imageUrl as string} alt="cover" /> : "Select Photo"}
        <input
          type="file"
          accept="image/*, .gif, video/*, application/pdf, audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </button>
  );
};

export default CoverArtUploadButton;
