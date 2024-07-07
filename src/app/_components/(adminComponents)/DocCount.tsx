import { api } from "~/trpc/server";

export default async function docCount() {
  const data = await api.get.fullPostCount.query();
  const esoBuildCount = data.filter(
    (post) =>
      post?.permissions?.eso == true && post?.permissions?.type == "build",
  ).length;
  const esoGuideCount = data.filter(
    (post) =>
      post?.permissions?.eso == true && post?.permissions?.type == "guide",
  ).length;
  const esoArticleCount = data.filter(
    (post) =>
      post?.permissions?.eso == true && post?.permissions?.type == "article",
  ).length;
  const swtorBuildCount = data.filter(
    (post) =>
      post?.permissions?.swtor == true && post?.permissions?.type == "build",
  ).length;
  const swtorGuideCount = data.filter(
    (post) =>
      post?.permissions?.swtor == true && post?.permissions?.type == "guide",
  ).length;
  const swtorArticleCount = data.filter(
    (post) =>
      post?.permissions?.swtor == true && post?.permissions?.type == "article",
  ).length;
  const ffxivBuildCount = data.filter(
    (post) =>
      post?.permissions?.ffxiv == true && post?.permissions?.type == "build",
  ).length;
  const ffxivGuideCount = data.filter(
    (post) =>
      post?.permissions?.ffxiv == true && post?.permissions?.type == "guide",
  ).length;
  const ffxivArticleCount = data.filter(
    (post) =>
      post?.permissions?.ffxiv == true && post?.permissions?.type == "article",
  ).length;
  const generalArticleCount = data.filter(
    (post) =>
      post?.permissions?.general == true &&
      post?.permissions?.type == "article",
  ).length;
  const results = {
    eso_build: esoBuildCount,
    eso_guide: esoGuideCount,
    eso_article: esoArticleCount,
    swtor_build: swtorBuildCount,
    swtor_guide: swtorGuideCount,
    swtor_article: swtorArticleCount,
    ffxiv_build: ffxivBuildCount,
    ffxiv_guide: ffxivGuideCount,
    ffxiv_article: ffxivArticleCount,
    general_article: generalArticleCount,
  };
  return results;
}
