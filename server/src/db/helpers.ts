import {  customType, sqliteTableCreator  } from "drizzle-orm/sqlite-core";

// Enum helper //

export const textEnum = <V extends Record<string, string>, RV = V[keyof V]>(
    columnName: string,
    enumObj: V,
    message?: string,
  ) => {
    const colFn = customType<{
      data: string;
      driverData: string;
    }>({
      dataType() {
        return "text";
      },
      toDriver(value: string): string {
        const values = Object.values(enumObj);
        if (!values.includes(value))
          throw Error(
            message ??
              `Invalid value for column ${columnName}. Expected:${values.join(
                ",",
              )} | Found:${value}`,
          );
        return value;
      },
    });
    return colFn(columnName).$type<RV>();
  };


  
// prettier-ignore
export const languageEnum ={
  English: "en",
  German: "de",
  Spanish: "es",
  French: "fr",
  Italian: "it",
  Bosnian: "bs",
  Serbian: "sr",
  Japanese: "ja",
  Chinese: "zh",
  Russian: "ru",
  Korean: "ko",
  Portuguese: "pt",
  Arabic: "ar",
  Vietnamese: "vi",
  Hindi: "hi",
  Thai: "th",
  Indonesian: "id",
  Malayalam: "ml",
  Dutch: "nl",
  Polish: "pl",
  Turkish: "tr",
  Greek: "el",
  Czech: "cs",
  Swedish: "sv",
  Danish: "da",
  Finnish: "fi",
  Norwegian: "no",
  Hungarian: "hu",
  Irish: "ga",
  Icelandic: "is",
  Hebrew: "he",
  Latvian: "lv",
  Maltese: "mt",
  Romanian: "ro",
  Slovak: "sk",
  Ukrainian: "uk",
  Estonian: "et",
  Lithuanian: "lt",
  Afrikaans: "af",
  Uzbek: "uz",
  Amharic: "am",
} as const


// prettier-ignore
export const countryEnum = {
  UK: "UK",
  US: "US",
  Canada: "CA",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Italy: "IT",
  Netherlands: "NL",
  Brazil: "BR",
  Russia: "RU",
  India: "IN",
  China: "CN",
  Japan: "JP",
  Taiwan: "TW",
  Singapore: "SG",
  Australia: "AU",
  Vietnam: "VN",
  Indonesia: "IDN",
  SouthAfrica: "ZAF",
  Mexico: "MEX",
  Argentina: "ARG",
  Poland: "PL",
  SouthKorea: "KR",
  Ireland: "IE",
  Norway: "NO",
  Sweden: "SE",
  Denmark: "DK",
  Finland: "FI",
  Ukraine: "UA",
  Egypt: "EG",
  Turkey: "TR",
  Israel: "IL",
  Portugal: "PT",
  Hungaryary: "HU",
  Qatar: "QA",
  Belgium: "BE",
  Colombia: "COL",
  Austria: "AT",
  Malaysia: "MY",
  Peru: "PER",
  Bolivia: "BOL",
  Lebanon: "LBN",
  CostaRica: "CRI",
  SriLanka: "LKA",
  Moldova: "MDA",
  CzechRepublic: "CZ",
  Chile: "CL",
  Cyprus: "CY",
  Dominica: "DMA",
  Ecuador: "ECU",
  Ethiopia: "ETH",
  Fiji: "FJI",
  Georgia: "GEO",
  Guatemala: "GTM",
  Greece: "GRC",
  Gibraltar: "GIB",
  Greenland: "GRL",
  HongKong: "HKG",
  Guinea: "GIN",
  Hungary: "HUN",
  Iceland: "ISL",
  Jamaica: "JAM",
  Jordan: "JOR",
  Kazakhstan: "KAZ",
  Latvia: "LVA",
  Liechtenstein: "LIE",
  Kenya: "KEN",
  Kosovo: "XKK",
  Liberia: "LBR",
  Lithuania: "LTU",
  Malta: "MLT",
  Montenegro: "MNE",
  Montserrat: "MS",
  NetherlandsAntilles: "NLD",
  Namibia: "NA",
  NewZealand: "NZ",
  Philippines: "PH",
  UnitedArabEmirates: "AE",
  PuertoRico: "PR",
  SanMarino: "SM",
  SouthSudan: "SSD",
    
} as const


// prettier-ignore
export const fieldEnum = {
  General: "General",
  insurance: "insurance",
  politics: "politics",
  Business: "Business",
  Technology: "Technology",
  Science: "Science",
  Health : "Health ",
  Wellness:"Wellness",
  Innovation:"Innovation",
  Startups:"Startups",
  investments:"investments",
  Education:"Education",
  Environment:"Environment",
  Arts:"Arts",
  Culture:"Culture",
  sport:"sport",
  RiskManagement:"RiskManagement",
  Automotive:"Automotive",
  Fashion:"Fashion",
  lifestyle:"lifestyle",
  Gadgets:"Gadgets",
  Engineering:"Engineering",
  Telecommunications:"Telecommunications",
  media:"media",
  IT:"IT",
  gaming:"gaming",
  Computing:"Computing",
} as const;


export const sqliteTable = (tenant?: string) =>
	sqliteTableCreator(name => (tenant ? `${tenant}_${name}` : name))



export const timestamp = customType<{
  data: Date;
  driverData: string;
}>({
  dataType() {
    return "datetime";
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});