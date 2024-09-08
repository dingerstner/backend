import { text} from "drizzle-orm/sqlite-core";
import { sql} from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { textEnum,languageEnum,countryEnum } from "@/db/helpers";
import { sqliteTable, timestamp} from "../../helpers";





//Company//
export const company = sqliteTable()("company",{
    id:            text("id"),
    compnyName:    text("compnyName"),
    logo:          text("logo"),
    Industry:      text("industry" ),
    industryDetails:text("industryDetails"),
    companySize:   text("companySize"),
    //brand awareness
    brandAwareness:text("brand_awareness"),
    typeOfCompany: text("typeOfCompan"),
    stage:         text("stage"), 
    competitor:    text ("competitor"),
    type:          text ("type",{ enum: ["General","SoftwareDevelopment","HardwareManufacturing","Telecommunications","ECommerce","Cybersecurity","CloudComputing","AI","AugmentedReality","HealthTech","FinTech","Insurtech","EdTech","AutomotiveTech","FinancialConsulting"]}).default("General"),
    goalOne:       text("goalOne",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    goalTwo:       text("goalTwo",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    goalThree:     text("goalThree",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    targetAudienceOne: text("targetAudienceOne:",{ enum: ["General","GeneralConsumers","IndustryProfessionals","PotentialBusinessPartners","Investors","EarlyAdopters","existingCustomers"]}).default("General"),
    targetAudienceTwo:text("targetAudienceTwo",{ enum: ["General","GeneralConsumers","IndustryProfessionals","PotentialBusinessPartners","Investors","EarlyAdopters","existingCustomers"]}).default("General"),
    mediaField:    text("mediaField",{ enum: ["General","insurance","Technology","Science","Health","Wellness","Startups","investments","Education","environment","Arts","Culture","sport","Automotive","Fashion","lifestyle","Gadgets","Engineering","Telecommunications","media","IT","gaming","Computing","RiskManagement"]}).default("General"),
    keywordOne:    text("keywordOne"),
    keywordTwo:    text("keywordTwo"),
    keywordThree:  text("keywordThree"),
    keywordFour:   text("keywordFour"),
    keywordFive:   text("keywordFive"),
    keywordSix:    text("keywordSix"),
    keywordSeven:  text("keywordSeven"),
    keywordEight:  text("keywordEight"),
    keywordNine:   text("keywordNine"),
    keywordTen:    text("keywordTen"),
    ExecutiveOne:  text("keyExecutive"),
    ExecutiveTwo:  text("keyExecutiveTwo"),
    ExecutiveThree:text("keyExecutiveThree"),
    ExecutiveFour: text("keyExecutiveFour"),
    ExecutiveFive: text("keyExecutiveFive"),
    TimeCount:     text("TimeCount"),
    language:      textEnum("language",languageEnum).default("en"),
    country:       textEnum("country",countryEnum), 
    createdAt:     timestamp("createdAt").notNull().default(sql`(current_timestamp)`),
    updatedAt:     timestamp("updatedAt").notNull().default(sql`(current_timestamp)`),
   }
  )


  export const insertCompanySchema = createInsertSchema(company);
  export const selectCompanySchema = createSelectSchema(company);
























