import React, { useState, useMemo, useEffect, useRef, RefObject } from 'react';
import './App.css'
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from '../hooks/useNuiEvent';
import { cars, Car, brands, logo } from './carData';
import CarItem from './carItem';

// This will set the NUI to visible if we are
// developing in the browser
debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

interface ReturnClientDataCompProps {
  data: any
}

type CarFormState = {
  displayname: string;
  spawncode: string;
  topSpeed: string;
  price: string; // change this to string
  image: string;
  tags: string;  // use a simple string and split by commas later
  year: string;  // change this to string
};


const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({ data }) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>
        {JSON.stringify(data, null)}
      </code>
    </pre>
  </>
)

const AddCarModal: React.FC<{ close: () => void }> = ({ close }) => {
  const [carForm, setCarForm] = useState<CarFormState>({
    displayname: '',
    spawncode: '',
    topSpeed: '',
    price: '',
    image: '',
    tags: '',
    year: ''
});

  const handleInputChange = (field: keyof CarFormState, value: string) => {
    setCarForm(prevState => ({
      ...prevState,
      [field]: value
    }));
  };


  const handleSubmit = () => {
    // Implement the logic to add the car here
    console.log(carForm);
    close(); // Close the modal after submitting
  };

  return (
    <div className="modal-background">
      <div className="modal-card">
        <h3>Lägg till bil</h3>
        <input
          type="text"
          placeholder="Modell"
          value={carForm.displayname}
          onChange={e => handleInputChange('displayname', e.target.value)}
        />
        <input
          type="text"
          placeholder="Spawn Code"
          value={carForm.spawncode}
          onChange={e => handleInputChange('spawncode', e.target.value)}
        />
        <input
          type="text"
          placeholder="Top Speed"
          value={carForm.topSpeed}
          onChange={e => handleInputChange('topSpeed', e.target.value)}
        />
        <input
          type="number"
          placeholder="Pris"
          value={carForm.price}
          onChange={e => handleInputChange('price', (e.target.value))}
        />
        <input
          type="text"
          placeholder="Bild URL" // Assuming you are using URLs for images
          value={carForm.image}
          onChange={e => handleInputChange('image', e.target.value)}
        />
        <input
          type="text"
          placeholder="Taggar (,)" 
          onChange={e => handleInputChange('tags', e.target.value)}
        />
        <input
          type="number"
          placeholder="Årsmodell"
          value={carForm.year}
          onChange={e => handleInputChange('year', (e.target.value))}
        />
        <button onClick={handleSubmit}>Add Car</button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};



const handleClose = () => {
  // Whatever method you use to close the program
  // If fetchNui('closeNui') is what you use, then:
  fetchNui('closeNui').then(() => {
    console.log('NUI closed by X button.');
  });
};



interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const getBrand = (car: Car) => {
  // This is a simple heuristic based on your current data structure.
  // It considers the second tag as the brand.
  // Make adjustments if needed.
  return car.tags[0];
}
const getBrandImage = (brandName: string) => {
  const brand = brands.find(b => b.name === brandName);
  return brand ? brand.image : null;
}







const App: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [expandedCar, setExpandedCar] = useState<string | null>(null);
  const [previousSearchLength, setPreviousSearchLength] = useState<number>(0);
  const minCarPrice = Math.min(...cars.map(car => car.price));
  const maxCarPrice = Math.max(...cars.map(car => car.price));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clientData, setClientData] = useState<ReturnData | null>(null);
  const minCarYear = Math.min(...cars.map(car => car.year));
  const maxCarYear = Math.max(...cars.map(car => car.year));
  const [minYear, setMinYear] = useState<number>(minCarYear);
  const [maxYear, setMaxYear] = useState<number>(maxCarYear);
  const [minPrice, setMinPrice] = useState<number>(minCarPrice);
  const [showExpandedSearchOptions, setShowExpandedSearchOptions] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(maxCarPrice);
  const [minPriceDisplay, setMinPriceDisplay] = useState<string>("");
  const [maxPriceDisplay, setMaxPriceDisplay] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState<boolean>(false);
  const formatNumberWithSpaces = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setExpandedCar(null); // collapse any individually expanded car when exiting edit mode
    }
    setIsEditMode(!isEditMode);
  };



  const handleResetFields = () => {
    setSearchTerm(""); // Reset search term
    setMinPrice(minCarPrice); // Reset min price
    setMaxPrice(maxCarPrice); // Reset max price
    setMinYear(minCarYear); // Reset min year
    setMaxYear(maxCarYear); // Reset max year
    setMinPriceDisplay(''); // Reset min price display
    setMaxPriceDisplay(''); // Reset max price display
  };
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const filteredCars = useMemo(() => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    const filtered = cars.filter((car) => {
      // Checks if the price of the car is within the range set by user
      if ((minPrice !== null && car.price < minPrice) || (maxPrice !== null && car.price > maxPrice)) {
        return false;
      }
      if ((minYear !== null && car.year < minYear) || (maxYear !== null && car.year > maxYear)) {
        return false;
      }

      return searchTerms.every(term =>
        car.tags.some(tag => tag.toLowerCase().includes(term)) ||
        car.spawncode.toLowerCase().includes(term)
      );
    });

    // Sort by brand first, then by displayname
    filtered.sort((a, b) => {
      if (getBrand(a) !== getBrand(b)) {
        return getBrand(a).localeCompare(getBrand(b));
      }
      return a.displayname.localeCompare(b.displayname);
    });

    return filtered;
  }, [searchTerm, minPrice, maxPrice, minYear, maxYear]);

  const handleCarSelection = (carName: string, isPurchased: boolean) => {
    fetchNui('spawnCar', { carName, isPurchased }).then(response => {
      console.log(response);
      // After spawning the car, send an event to close the NUI frame
      fetchNui('closeNui').then(() => {
        console.log('NUI closed after car selection.');
      });
    });
  };

  useNuiEvent("setVisible", (data: any) => {
    console.log("setVisible", data);
  });

  return (

    <div className={`nui-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='popup-thing'>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="search-bar-container">
            {/* This div wraps the main search bar elements */}
            <div className="search-main-bar">
              <img src={logo.image} alt="Logo" />
              <input
                type="text"
                value={searchTerm}
                className="search-input"
                placeholder="Sök efter bilmodell, bilmärke"
                onChange={(e) => {
                  setPreviousSearchLength(searchTerm.length);
                  setSearchTerm(e.target.value);
                }}
              />
              <input
                type="text"
                className="price-input"
                value={minPriceDisplay}
                placeholder="Min pris"
                min={0}
                max={minCarPrice}
                onChange={(e) => {
                  const numericValue = parseInt(e.target.value.replace(/\s+/g, ''), 10);
                  if (isNaN(numericValue)) {
                    setMinPrice(minCarPrice);
                    setMinPriceDisplay('');
                  } else {
                    setMinPrice(numericValue);
                    setMinPriceDisplay(formatNumberWithSpaces(numericValue));
                  }
                }}
              />
              <input
                type="text"
                className="price-input"
                value={maxPriceDisplay}
                placeholder="Max pris"
                min={minCarPrice}
                max={maxCarPrice}
                onChange={(e) => {
                  const numericValue = parseInt(e.target.value.replace(/\s+/g, ''), 10);
                  if (isNaN(numericValue)) {
                    setMaxPrice(maxCarPrice);
                    setMaxPriceDisplay('');
                  } else {
                    setMaxPrice(numericValue);
                    setMaxPriceDisplay(formatNumberWithSpaces(numericValue));
                  }
                }}
              />
              <div className="counter">
                {filteredCars.length > 0 ? `${filteredCars.length} bilar hittade` : 'Inga bilar hittades'}
              </div>
              <button id="AltButton"
                onClick={() => {
                  // Check if showExpandedSearchOptions is currently true, meaning we're about to hide it
                  if (showExpandedSearchOptions) {
                    // Reset all the filters
                    setMinYear(minCarYear);
                    setMaxYear(maxCarYear);
                  }
                  setShowExpandedSearchOptions(!showExpandedSearchOptions);
                }}
              >
                {showExpandedSearchOptions ? 'Dölj Alternativ' : 'Fler Alternativ'}
              </button>

            </div>
            {/* This will display your expanded search options */}
            {/* This will display your expanded search options */}
            {showExpandedSearchOptions &&
              <div className="expanded-search-options">

                {/* Add your min year and max year input fields here */}
                <input
                  type="number"
                  className="year-input"
                  placeholder="Min år"
                  min={0} // Assuming the oldest cars are from 1900
                  max={new Date().getFullYear()} // Current year as max value
                  onChange={(e) => {
                    const numericValue = parseInt(e.target.value, 10);
                    if (!isNaN(numericValue)) {
                      setMinYear(numericValue);
                    }
                    if (isNaN(numericValue)) {
                      setMinYear(minCarYear);
                    }
                  }}

                />
                <input
                  type="number"
                  className="year-input"
                  placeholder="Max år"
                  min={1900}
                  max={new Date().getFullYear()}
                  onChange={(e) => {
                    const numericValue = parseInt(e.target.value, 10);
                    if (!isNaN(numericValue)) {
                      setMaxYear(numericValue);
                    }
                    if (isNaN(numericValue)) {
                      setMaxYear(maxCarYear);
                    }
                  }}

                />
                {isEditMode && (
                  <button id="addNewCarButton" onClick={() => setShowAddCarModal(true)}>Lägg till bil</button>
                )}

                <button id="editButton" onClick={handleToggleEditMode}>
                  {isEditMode ? 'Spara' : 'Ändra'}
                </button>
                <button id="rensButton" onClick={handleResetFields}>Rensa</button>
                <button id="darkMode" onClick={toggleDarkMode}>
                  {isDarkMode ? 'Mörkt' : 'Ljust'}
                </button>

              </div>
            }
          </div>


          <div className="car-container">
            {filteredCars.length > 0 ? (
              <div className="car-inner-container">
                {filteredCars.map((car, index) => {
                  const isNewBrand = (index === 0 || getBrand(car) !== getBrand(filteredCars[index - 1]));
                  return (
                    <React.Fragment key={car.spawncode}>
                      {isNewBrand && (
                        <div className="brand-section">
                          <img
                            src={getBrandImage(getBrand(car))}
                            alt={getBrand(car)}
                          />
                        </div>
                      )}
                      <div className={`car-group ${isNewBrand ? 'start-group' : ''} ${isEditMode ? 'edit-mode shake-effect' : ''}`}>
                        <CarItem
                          car={car}
                          isEditMode={isEditMode}
                          handleCarSelection={handleCarSelection}
                          searchTerm={searchTerm}
                          previousSearchLength={previousSearchLength}
                          expanded={isEditMode || expandedCar === car.spawncode}
                          toggleExpand={() => {
                            if (expandedCar === car.spawncode) {
                              setExpandedCar(null);
                            } else {
                              setExpandedCar(car.spawncode);
                            }
                          }}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Inga bilar matchar din sökning.
              </div>
            )}
            <div className="filler-container">
              <div className="car-image-filler"></div>
              <div className="car-image-filler"></div>
              <div className="car-image-filler"></div>
            </div>
          </div>
        </div>
        {clientData && <ReturnClientDataComp data={clientData} />}
      </div>
      {showAddCarModal && <AddCarModal close={() => setShowAddCarModal(false)} />}
    </div>
  );
}


export default App;
