import React, { useEffect, useRef, useState, RefObject } from 'react';
import { cars, Car, brands, logo } from './carData';


const getBrand = (car: Car) => {
  // This is a simple heuristic based on your current data structure.
  // It considers the second tag as the brand.
  // Make adjustments if needed.
  return car.tags[0];
}


const useOnScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // This will now trigger every time the visibility changes (entering or leaving the viewport)
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isVisible;
};

interface CarItemProps {
  car: Car;
  handleCarSelection: (carName: string, isPurchased: boolean) => void;
  searchTerm: string;
  previousSearchLength: number;
  expanded: boolean;
  toggleExpand: () => void;
  isEditMode: boolean;
}

function CarItem({ car, isEditMode, handleCarSelection, searchTerm, previousSearchLength, expanded, toggleExpand }: CarItemProps & { expanded: boolean; toggleExpand: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(ref);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isEditMode); // State to track expanded mode

  const [carData, setCarData] = useState<Car>({
    ...car,
  });

  useEffect(() => {
    if (isEditMode) {
      setIsExpanded(true);
    }
  }, [isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Car) => {
    setCarData({
      ...carData,
      [field]: e.target.value,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    if (!isEditMode) {
      toggleExpand();
    }
  };


  const handleMoreInfoClick = () => {
    // Logic to display more information or navigate to another page
    // For instance, call handleCarSelection here if you wish
    handleCarSelection(car.spawncode, false);
  };

  return (
    <div ref={ref}
      className={`car-item ${expanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''} ${isOnScreen ? 'zoom-in-effect' : 'zoom-out-effect'} ${isEditMode ? 'edit-mode' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleExpand}
    >
      <img
        className="car-image"
        src={car.image}
        alt={car.spawncode}
      />
      {isEditMode && (
        <button className="delete-button">
          X
        </button>
      )}
      <div className="car-info">
        {isEditMode ? (
          <input
            value={carData.displayname}
            onChange={(e) => handleInputChange(e, 'displayname')}
          />
        ) : (
          <span>{car.displayname}</span>
        )}
        <br />
        {isEditMode ? (
          <input
            value={String(carData.price)}
            onChange={(e) => handleInputChange(e, 'price')}
            type="number"
          />
        ) : (
          <span>{new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(car.price)}</span>
        )}
        {expanded && (
          <>
            <br />
            {isEditMode ? (
              <input
                value={String(carData.topSpeed)}
                onChange={(e) => handleInputChange(e, 'topSpeed')}
                type="number"
              />
            ) : (
              <span>{car.topSpeed} km/h</span>
            )}
            <br />
            {isEditMode ? (
              <input
                value={String(carData.year)}
                onChange={(e) => handleInputChange(e, 'year')}
                type="number"
              />
            ) : (
              <span>{car.year}</span>
            )}
            <br />
            {isEditMode ? (
              <input
                value={getBrand(carData)}
                onChange={(e) => handleInputChange(e, 'tags')}
              // You'll need to handle how tags are managed; the above might be too simple
              />
            ) : (
              <span>{getBrand(car)}</span>
            )}
          </>
        )}
      </div>
      {expanded && (
        <div className="expanded-options">
          {!isEditMode && (
            <>
              <button onClick={handleCarSelection.bind(null, car.spawncode, true)}>Köp</button>
              <span>Lager: 2</span>
              <button onClick={handleCarSelection.bind(null, car.spawncode, false)}>Inspektera</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default CarItem;