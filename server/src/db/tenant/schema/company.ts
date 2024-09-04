import {  text, integer,foreignKey,sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { sql, type InferSelectModel, type InferInsertModel  } from "drizzle-orm";
import { z } from "zod";
import { article } from "./article";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { textEnum,languageEnum,countryEnum } from "@/db/tenant/schema/helpers";



const sqliteTable = (tenant?: string) =>
	sqliteTableCreator(name => (tenant ? `${tenant}_${name}` : name))

//Company//
export const company = sqliteTable()("company",{
    id: text("id"),
    compnyName: text("compnyName"),
    logo: text("logo"),
    Industry: text("industry" ),
    industryDetails: text("industryDetails"),
    companySize: text("companySize"),
    brandAwareness:text("brand_awareness"),
    typeOfCompany: text("typeOfCompan"),
    stage: text("stage"), 
    competitor:text ("competitor"),
    createdAt: integer('createdAt').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: integer("updatedAt").default(sql`(CURRENT_TIME)`),
    
   }
  )
  export type SelectCompany= typeof company.$inferSelect;
  export type insertCompany = typeof company.$inferInsert;

  export const insertCompanySchema = createInsertSchema(company);
  export const selectCompanySchema = createSelectSchema(company);



//goal//
  export const goalTags = sqliteTable()("goalTags", {
    companyId: text("companyId"),
    type: text ("type",{ enum: ["General","SoftwareDevelopment","HardwareManufacturing","Telecommunications","ECommerce","Cybersecurity","CloudComputing","AI","AugmentedReality","HealthTech","FinTech","Insurtech","EdTech","AutomotiveTech","FinancialConsulting"]}).default("General"),
    goalOne: text("goalOne",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    goalTwo:text("goalTwo",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    goalThree:text("goalThree",{ enum: ["General","ProductLaunch","MarketPenetration","CustomerAcquisition","CustomerRetention","SalesGrowth","GlobalExpansion","DigitalMarketing","SocialMediaEngagement","InvestorRelations","TalentAcquisition","PartnershipsAlliances","CustomerFeedback","ThoughtLeadership","RegulatoryCompliance","Sustainability","CustomerEducation","CustomerAdvocacy"]}).default("General"),
    targetAudienceOne: text("targetAudienceOne:",{ enum: ["General","GeneralConsumers","IndustryProfessionals","PotentialBusinessPartners","Investors","EarlyAdopters","existingCustomers"]}).default("General"),
    targetAudienceTwo:text("targetAudienceTwo",{ enum: ["General","GeneralConsumers","IndustryProfessionals","PotentialBusinessPartners","Investors","EarlyAdopters","existingCustomers"]}).default("General"),
    mediaField: text("mediaField",{ enum: ["General","insurance","Technology","Science","Health","Wellness","Startups","investments","Education","environment","Arts","Culture","sport","Automotive","Fashion","lifestyle","Gadgets","Engineering","Telecommunications","media","IT","gaming","Computing","RiskManagement"]}).default("General"),
  },
  (goalTags) => {
    return {
      goalTagsFk: foreignKey({
        columns: [goalTags.companyId],
        foreignColumns: [company.id],
        name: "goalTagsFk"
      })
    }
  }
)

  export type SelectGoalTags = typeof goalTags.$inferSelect;
  export type InsertGoalTags = typeof goalTags.$inferInsert;

  export const insertGoalTagsSchema = createInsertSchema(goalTags);
  export const selectGoalTagsSchema = createSelectSchema(goalTags);

// keywords//
  export const keywords  = sqliteTable()("keywords", {
    companyId: text("companyId"), 
    keywordOne: text("keywordOne"),
    keywordTwo: text("keywordTwo"),
    keywordThree: text("keywordThree"),
    keywordFour: text("keywordFour"),
    keywordFive: text("keywordFive"),
    keywordSix: text("keywordSix"),
    keywordSeven: text("keywordSeven"),
    keywordEight: text("keywordEight"),
    keywordNine: text("keywordNine"),
    keywordTen: text("keywordTen"),
    ExecutiveOne: text("keyExecutive"),
    ExecutiveTwo: text("keyExecutiveTwo"),
    ExecutiveThree: text("keyExecutiveThree"),
    ExecutiveFour: text("keyExecutiveFour"),
    ExecutiveFive: text("keyExecutiveFive"),
    TimeCount: text("TimeCount"),
    language: textEnum("language",languageEnum).default("en"),
    country: textEnum("country",countryEnum), 
    
  },
  (keywords) => {
    return {
      keywordsFk: foreignKey({
        columns: [keywords.companyId],
        foreignColumns: [company.id],
        name: "keywordsFk"
      })
    }
  }
)

const SelectArticlKeyWords = createSelectSchema(keywords);
export type QueryArticle = z.infer<typeof QuerySechema>['body'];



export const QuerySechema = z.object({
    body: SelectArticlKeyWords.pick({
        keywordOne: true,
        keywordTwo: true,  
        keywordThree: true,
        keywordFour: true,
        keywordFive: true,
        keywordSix: true,
        keywordSeven: true,
        keywordEight: true,
        keywordNine: true,
        keywordTen: true,
        ExecutiveOne: true,
        ExecutiveTwo: true,
        ExecutiveThree: true,
        ExecutiveFour: true,
        ExecutiveFive: true,
        language: true,
        country: true,
        TimeCount: true
    }),
  });


//articleScore//
  export const articleScore = sqliteTable()(
    "articleScore",{
    articleId: text("id").notNull().primaryKey(),
    companyId: text("companyId").notNull(),
    headLine:integer("headline", { mode:'number'}),
    subHeadLine:integer("subHeadLine", { mode: 'number' }),
    content:integer("content", { mode: 'number' }),
    source:integer("source", { mode: 'number' }),
    postedOnHomePage:integer("postedOnHomePage", { mode: 'number' }),
    image:integer("image", { mode: 'number' }),
    video:integer("video", { mode: 'number' }),
    audio:integer("Audio", { mode: 'number' }),
    total: integer("total", { mode: 'number' })
  },
  (articleScore) => {
    return {
      articleScoreCompanyFk: foreignKey({
        columns: [articleScore.companyId],
        foreignColumns: [company.id],
        name: "articleScoreCompanyFk"
      }),
      articleScoreFk: foreignKey({
        columns: [articleScore.articleId],
        foreignColumns: [article.id],
        name: "articleScoreFk"
      })
    }
  }
);
  
  export type SelectArticleScore = InferSelectModel<typeof articleScore>;
  export type insertArticleScore = InferInsertModel<typeof articleScore>;
  





















