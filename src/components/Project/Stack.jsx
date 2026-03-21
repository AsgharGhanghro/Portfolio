import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        x,
        y,
        rotateX,
        rotateY,
        cursor: "grab",
      }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

const CARD_W = 500;
const CARD_H = 340;

const defaultCards = [

  {
    id: 1,
    img: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5pa2V8ZW58MHx8MHx8fDA%3D",
    link: "https://nike-website-react-mu.vercel.app/services",
    title: "Nike Website",
  },
 
   {
    id: 2,
    img: "https://images.unsplash.com/photo-1632178151697-fd971baa906f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWdlbmN5JTIwdHJhdmVsfGVufDB8fDB8fHww",
    link: "https://agency-lyart-five.vercel.app/",
    title: "Agency Website",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1570369749428-c586ed3b828f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpva2UlMjBhbmFseXplcnxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://joke-analyzer.vercel.app/",
    title: "Joke Analyzer",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D",
    link: "https://house-price-prediction-amber-rho.vercel.app/",
    title: "House Price Pridiction",
  },

  {
    id: 5,
    img: "https://media.istockphoto.com/id/2079003196/photo/heart-attack-man-clutching-his-chest-from-acute-pain-heart-attack-symptom.webp?a=1&b=1&s=612x612&w=0&k=20&c=ybSwg-AhIEfRUuAv3wDj9_h-PKzX6TpBX5lm8pq1jFk=",
    link: "https://coronery-artery-disease-prd.vercel.app/",
    title: "Coronery Artery Disease Prediction",
  },
];

export default function Stack({
  sensitivity = 200,
  animationConfig = { stiffness: 160, damping: 200 },
  cardsData = [],
}) {
  const [cards, setCards] = useState(
    cardsData.length ? cardsData : defaultCards
  );
  const [isDragging, setIsDragging] = useState(false);

  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 0 80px",
        width: "100%",
      }}
    >
    
      <div
        style={{
          position: "relative",
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          perspective: "1000px",
        }}
      >
        {cards.map((card, index) => {
          const isTop = index === cards.length - 1;
          const fromTop = cards.length - 1 - index;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
            >
              <motion.div
                animate={{
                  // each card behind rotates slightly and scales down
                  rotateZ: fromTop * 4,
                  scale: 1 - fromTop * 0.06,
                  transformOrigin: "90% 90%",
                }}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "5px solid white",
                  boxShadow: isTop
                    ? "0 24px 60px rgba(0,0,0,0.3)"
                    : "0 8px 24px rgba(0,0,0,0.15)",
                  position: "relative",
                }}
              >
                {/* Whole card is clickable link */}
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseDown={() => setIsDragging(false)}
                  onMouseMove={() => setIsDragging(true)}
                  onClick={(e) => {
                    if (isDragging) e.preventDefault();
                  }}
                  style={{ display: "block", width: "100%", height: "100%" }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Title overlay only on top card */}
                  {isTop && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "24px 28px",
                      }}
                    >
                      <div>
                        <p style={{ color: "white", fontWeight: 700, fontSize: "20px", margin: 0 }}>
                          {card.title}
                        </p>
                        <p style={{ color: "#06b6d4", fontSize: "13px", margin: "6px 0 0" }}>
                          Click to open project →
                        </p>
                      </div>
                    </div>
                  )}
                </a>
              </motion.div>
            </CardRotate>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ marginTop: "44px", display: "flex", gap: "10px", alignItems: "center" }}>
        {cards.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === cards.length - 1 ? "28px" : "9px",
              height: "9px",
              borderRadius: "5px",
              background: index === cards.length - 1 ? "#06b6d4" : "#ccc",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}