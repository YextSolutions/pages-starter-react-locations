/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import PageLayout from "../components/PageLayout";
import Breadcrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      // These fields will be used in Module 5 of the Hitchhikers Pages Track: https://hitchhikers.yext.com/tracks/pages-development/pgs605-create-directory/01-yext-directory-manager/
      // "dm_directoryParents_us_directory.name",
      // "dm_directoryParents_us_directory.slug",
      // "dm_directoryParents_us_directory.meta",
      // "dm_directoryParents_us_directory.c_addressRegionDisplayName",
      // "dm_directoryChildren.name",
      // "dm_directoryChildren.address",
      // "dm_directoryChildren.mainPhone",
      // "dm_directoryChildren.slug",
    ],
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

// transformProps will be used in Module 5 of the Hitchhikers Pages Track: https://hitchhikers.yext.com/tracks/pages-development/pgs605-create-directory/01-yext-directory-manager/
// export const transformProps: TransformProps<any> = async (data) => {
//   const { dm_directoryParents_us_directory, name } = data.document;

//   (dm_directoryParents_us_directory || []).push({ name: name, slug: "" });

//   return {
//     ...data,
//     document: {
//       ...data.document,
//       dm_directoryParents: dm_directoryParents_us_directory,
//     },
//   };
// };

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const { name, description, dm_directoryParents, dm_directoryChildren } =
    document;

  return (
    <>
      <PageLayout templateData={{ __meta, document }}>
        <Banner name={name} />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default City;
