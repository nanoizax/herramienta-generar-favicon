import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { generateFavicons, bundleFaviconsAsZip, type FaviconImage } from "@/lib/tools/faviconGenerator";

const GenerarFaviconPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<FaviconImage[] | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selected: File) => {
    setFile(selected);
    setImages(null);
    setError(null);
    setProcessing(true);
    try {
      setImages(await generateFavicons(selected));
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setImages(null);
    setError(null);
  };

  const handleDownloadZip = async () => {
    if (!images) return;
    setProcessing(true);
    try {
      const blob = await bundleFaviconsAsZip(images);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "favicons.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout toolId="generar-favicon">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file ? (
          <FileDropZone
            accept="image/jpeg,image/png,image/webp"
            label={t("ui.upload_label")}
            hint={t("ui.upload_hint")}
            onFile={handleFile}
            toolId="generar-favicon"
          />
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button")}
              </Button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {images && (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {images.map((img) => (
                    <div key={img.size} className="text-center">
                      <img
                        src={URL.createObjectURL(img.blob)}
                        alt={`${img.size}x${img.size}`}
                        className="w-12 h-12 mx-auto rounded border border-neutral-800 bg-white/5"
                      />
                      <p className="text-neutral-500 text-xs mt-1">{img.size}px</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleDownloadZip}
                  isLoading={processing}
                  loadingText={t("ui.processing")}
                  className="bg-white text-black hover:bg-white/80 rounded-full px-8"
                >
                  <Download className="w-4 h-4" />
                  {t("ui.download_all_button")}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default GenerarFaviconPage;
