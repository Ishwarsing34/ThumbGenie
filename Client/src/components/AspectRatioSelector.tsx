import { RectangleHorizontalIcon, RectangleVertical, Square } from "lucide-react";
import { aspectRatios, type AspectRatio } from "../assetsone/assets";
import { ReactNode } from "react";

interface Props {
    value: AspectRatio;
    onChange: (ratio: AspectRatio) => void;
}

const AspectRatioSelector = ({ value, onChange }: Props) => {

    
    const iconMap: Record<AspectRatio, ReactNode> = {
        "16.9": <RectangleHorizontalIcon className="size-6 text-zinc-200" />,
        "1.1": <Square className="size-6 text-zinc-200" />,
        "9.6": <RectangleVertical className="size-6 text-zinc-200" />,
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-200">
                Aspect Ratio
            </label>

            <div className="flex flex-wrap gap-2">
                {aspectRatios.map((ratio) => {
                    const selected = value === ratio;

                    return (
                        <button
                            key={ratio}
                            type="button"
                            onClick={() => onChange(ratio)}
                            className={`
                                        flex items-center gap-2 rounded-md
                                        border px-5 py-2.5 text-sm transition
                                        border-white/10 text-zinc-200
                                        ${selected ? "bg-white/10" : "hover:bg-white/5"}
                                    `}
                        >
                            {iconMap[ratio]}
                            <span className="tracking-widest">{ratio}</span>
                        </button>

                    );
                })}
            </div>
        </div>
    );
};

export default AspectRatioSelector;
