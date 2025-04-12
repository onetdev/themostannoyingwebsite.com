import { ArticleService } from "@maw/content-api";

export const AppArticleService = new ArticleService({
  getAssetUrl: (path: string) => `/assets/articles/${path}`,
  getUrl: (item) => `/articles/${item.slug}`,
});
