import myImage1 from './images/adder.jpg';
import myImage2 from './images/phantom.jpg';
import myGt86 from './images/gt86.jpg';
import myFerrari from './images/488.jpeg';
import myLaFerrari from './images/laferrari.jpg';
import myPelican from './images/pelican.jpeg';
import myWarthog1 from './images/warthog1.jpeg';
import myModels from './images/models.jpg';
import mySupra from './images/supra.jpg';
import mySVJ from './images/SVJ.jpg';
import myGOLFR from './images/GOLF-R.jpg';
import myBMWM2 from './images/BMWM2.jpg';
import myAMGGT from './images/AMG-GT.webp';
import myPrius from './images/prius.jpg';
import Toyota from './images/vx-toyota-logo.webp';
import Ferrari from './images/Ferrari-Logo.png'
import Bugatti from './images/Bugatti_logo.svg.png'
import Bmw from './images/BMW.svg.png'
import Tesla from './images/Tesla_Motors.svg.png'
import Mercedes from './images/Mercedes-Logo.svg.png'
import Lamborghini from './images/Lamborghini_Logo.svg.png'
import Wolkswagen from './images/Volkswagen_logo_2019.svg.png'
import Lastbil from './images/truck.jpg'
import Halo from './images/Halo-Logo.png'
import Supra2 from './images/362902_3.jpg'
import Modelx from './images/modelx.jpg'
import Model3 from './images/model3.jpg'
import LogoImage from './images/logo.png'

export interface Logo {
  image: any
}

export interface Car {
  displayname: string;
  spawncode: string;
  topSpeed: string;
  price: number;
  image: any;
  tags: string[];
  year: number; // Add the 'year' property here
}


export interface Brand {
  name: string;
  image: any;
}

export const logo: Logo = {
  image: LogoImage
}

export const brands: Brand[] = [
  {
    name: 'Toyota',
    image: Toyota,
  },
  {
    name: 'Ferrari',
    image: Ferrari,
  },
  {
    name: 'Bugatti',
    image: Bugatti,
  },
  {
    name: 'Tesla',
    image: Tesla,
  },
  {
    name: 'Lamborghini',
    image: Lamborghini,
  },
  {
    name: 'Mercedes',
    image: Mercedes,
  },
  {
    name: 'Bmw',
    image: Bmw,
  },
  {
    name: 'Volkswagen',
    image: Wolkswagen,
  },
  {
    name: 'Lastbil',
    image: Lastbil,
  },
  {
    name: 'Halo',
    image: Halo,
  },
]

export const cars: Car[] = [
  {
    displayname: 'Lastbil',
    spawncode: 'phantom',
    topSpeed: '120',
    price: 1400000,
    image: myImage2,
    tags: ["Lastbil", "truck", "tung", "frakt", "industriellt"],
    year: 2011, // No specific year (generic "Lastbil" or truck)
  },
  {
    displayname: 'Chiron',
    spawncode: "ikx3gp22",
    topSpeed: '420',
    price: 28000000,
    image: myImage1,
    tags: ["Bugatti", "lyxbil", "snabb", "sport", "supersport", "hyperbil", "lyx", "fart", "kupe"],
    year: 2016,
  },
  {
    displayname: '488',
    spawncode: "4881",
    topSpeed: '330',
    price: 2500000,
    image: myFerrari,
    tags: ["Ferrari", "lyxbil", "488", "sport", "supersport", "italiensk", "racing", "prestanda", "lyx", "kupe"],
    year: 2015,
  },
  {
    displayname: 'LaFerrari',
    spawncode: "Laferrari",
    topSpeed: '350',
    price: 28000000,
    image: myLaFerrari,
    tags: ["Ferrari", "lyxbil", "laferrari", "sport", "supersport", "italiensk", "racing", "prestanda", "lyx", "kupe"],
    year: 2013,
  },
  {
    displayname: 'GT86',
    spawncode: "gt86",
    topSpeed: '210',
    price: 300000,
    image: myGt86,
    tags: ["Toyota", "coupé", "gt86", "sport", "japansk", "racing", "prestanda", "kupe"],
    year: 2012,
  },
  {
    displayname: 'Supra MK4',
    spawncode: "toysupmk4",
    topSpeed: '250',
    price: 500000,
    image: mySupra,
    tags: ["Toyota", "Supra", "bil", "sport", "japansk", "racing", "legend", "kupe"],
    year: 1993, // Estimated start year
  },
  {
    displayname: 'Prius',
    spawncode: "prius",
    topSpeed: '180',
    price: 300000,
    image: myPrius,
    tags: ["Toyota", "Prius", "bil", "sedan", "japansk"],
    year: 1997, // Estimated start year
  },
  {
    displayname: 'Warthog',
    spawncode: "warthog1",
    topSpeed: '130', // Fictional so this is a rough estimate
    price: 1200000, // Fictional, based on uniqueness and custom features
    image: myWarthog1,
    tags: ["Halo", "anpassad", "bil", "fiktiv", "stridsvagn", "terräng"],
    year: 2552, // No real-world year (fictional)
  },
  {
    displayname: 'Supra Mk5',
    spawncode: "xd",
    topSpeed: '260',
    price: 600000,
    image: Supra2,
    tags: ["Toyota", "Supra", "bil", "sport", "japansk", "racing", "legend", "kupe"],
    year: 2019,
  },
  {
    displayname: 'Pelican',
    spawncode: "pelican",
    topSpeed: '500', // Fictional, rough estimate
    price: 10000000, // Fictional, based on uniqueness and size
    image: myPelican,
    tags: ["Halo", "anpassad", "helikopter", "flyg", "fiktiv", "strid"],
    year: 2552, // No real-world year (fictional)
  },
  {
    displayname: 'Model S',
    spawncode: "models",
    topSpeed: '250',
    price: 900000,
    image: myModels,
    tags: ["Tesla", "Model S", "bil", "elbil", "amerikansk", "teknik", "framtid", "sedan"],
    year: 2012,
  },
  {
    displayname: 'SVJ',
    spawncode: "svj63",
    topSpeed: '350',
    price: 5000000,
    image: mySVJ,
    tags: ["Lamborghini", "SVJ", "bil", "supersport", "sport", "italiensk", "lyx", "prestanda", "kupe"],
    year: 2018,
  },
  {
    displayname: 'Golf R',
    spawncode: "golf75r",
    topSpeed: '250',
    price: 400000,
    image: myGOLFR,
    tags: ["Volkswagen", "Golf R", "bil", "sport", "tysk", "racing", "prestanda", "halvkombi", "Wolkswagen"],
    year: 2014,
  },
  {
    displayname: 'M2',
    spawncode: "bumpf_1",
    topSpeed: '250',
    price: 700000,
    image: myBMWM2,
    tags: ["Bmw", "M2", "bil", "sport", "tysk", "racing", "prestanda", "körning", "kupe"],
    year: 2016,
  },
  {
    displayname: 'AMG GT',
    spawncode: "mbbs20",
    topSpeed: '310',
    price: 1500000,
    image: myAMGGT,
    tags: ["Mercedes", "AMG", "bil", "supersport", "sport", "tysk", "lyx", "prestanda", "kupe"],
    year: 2014,
  },
  {
    displayname: 'Model X',
    spawncode: "modelx",
    topSpeed: '250',
    price: 950000,
    image: Modelx,
    tags: ["Tesla", "Model X", "bil", "elbil", "amerikansk", "teknik", "framtid", "suv"],
    year: 2015,
  },
  {
    displayname: 'Model 3',
    spawncode: "model3",
    topSpeed: '225',
    price: 550000,
    image: Model3,
    tags: ["Tesla", "Model 3", "bil", "elbil", "amerikansk", "teknik", "framtid", "sedan"],
    year: 2017,
  },
];
