import { yt_html } from "../assetsone/assets";
import { useSearchParams } from "react-router-dom";

const YtPreview = () => {
  const [searchParams] = useSearchParams();

  const thumbnail_url = searchParams.get("thumbnail_url");
  const title = searchParams.get("title");

  if (!thumbnail_url || !title) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        No preview data
      </div>
    );
  }

  const new_html = yt_html
    .replace("%%THUMBNAIL_URL%%", thumbnail_url)
    .replace("%%TITLE%%", title);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <iframe
        srcDoc={new_html}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default YtPreview;
