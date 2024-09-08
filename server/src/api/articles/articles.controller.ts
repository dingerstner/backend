import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import {pool} from "@/db/tenant/Pool";
import {article,newArticl,articleScore} from "@/db/tenant/schema/article";
import type { Article, NewArticl } from "@/api/articles/articles.schema";

export abstract class articleService {
    static serchForArticles (tenant: string){
        const f





    }
}
    
