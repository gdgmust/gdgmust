import type { SpringOptions } from "framer-motion";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useCommunity } from '@/components/community/context/CommunityContext';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  memberName?: string;
  memberRole?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function CommunityMembersCards({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent,
  displayOverlayContent = false,
  memberName,
  memberRole,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [lastY, setLastY] = useState(0);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    rotateFigcaption.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
  };

  const handleMouseEnter = () => {
    scale.set(scaleOnHover);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  };

  const resolvedCaptionText = memberName || captionText;
  let content = overlayContent;

  if (memberName && memberRole) {
    content = (
      <div className="p-3 bg-black/50 text-white rounded-2xl text-center flex flex-col justify-center items-start ">
        <h4 className="font-bold text-[16px]">{memberName}</h4>
        <p className="text-xs">{memberRole}</p>
      </div>
    );
  } else if (memberName) {
    content = (
      <div className="p-3 bg-black/60 text-white rounded-2xl text-center w-full h-full flex flex-col justify-center items-center">
        <h4 className="font-semibold text-md">{memberName}</h4>
      </div>
    );
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center select-none"
      draggable="false"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
        draggable="false"
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          draggable="false"
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)] select-none"
          style={{ width: imageWidth, height: imageHeight }}
        />

        {displayOverlayContent && content && (
          <motion.div className="absolute -bottom-[2px] left-[6px] z-[2] will-change-transform [transform:translateZ(30px)] p-2 select-none">
            {content}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {resolvedCaptionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

export function MemberTiltCardsSection() {
  const { filteredMembers } = useCommunity();
  const t = useTranslations();
  const locale = useLocale();

  const displayMembers = filteredMembers.slice(0, 8);
  if (displayMembers.length === 0) return null;

  const getFullName = (m: any) =>
    locale === 'mn' && m.nameMN ? `${m.surnameMN || ''} ${m.nameMN}`.trim() :
    m.nameEN ? `${m.nameEN} ${m.surnameEN || ''}`.trim() :
    m.name || '';

  const getRoleDisplay = (role: string) => {
    const map: Record<string, string> = {
      "leaderof-gdg": t('CommunityPage.catogorylist-leader.1'),
      "leaderof-development": t('CommunityPage.catogorylist-leader.2'),
      "leaderof-creative": t('CommunityPage.catogorylist-leader.3'),
      "leaderof-engagement": t('CommunityPage.catogorylist-leader.4'),
      "leaderof-outreach": t('CommunityPage.catogorylist-leader.5'),
      "memberof-development": t('CommunityPage.catogorylist-member.1'),
      "memberof-creative": t('CommunityPage.catogorylist-member.2'),
      "memberof-engagement": t('CommunityPage.catogorylist-member.3'),
      "memberof-outreach": t('CommunityPage.catogorylist-member.4'),
      "volunteer": t('CommunityPage.catogorylist-member.5'),
    };
    return map[role] || role;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-wrap justify-center gap-20" draggable="false">
        {displayMembers.map((m) => (
          <CommunityMembersCards
            key={m.id}
            imageSrc={typeof m.image === 'string' ? m.image : '/images/community/members/default.png'}
            containerWidth="260px"
            containerHeight="340px"
            imageWidth="300px"
            imageHeight="350px"
            rotateAmplitude={10}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            memberName={getFullName(m)}
            memberRole={getRoleDisplay(m.role)}
          />
        ))}
      </div>
    </div>
  );
}
