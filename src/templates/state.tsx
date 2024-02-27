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
import DirectoryStateGrid from "../components/DirectoryStateGrid";
import PageLayout from "../components/PageLayout";
import Breadcrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "state-stream",
    filter: {
      entityTypes: ["ce_state"],
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
      // "dm_directoryChildren.name",
      // "dm_directoryChildren.slug",
      // "dm_directoryChildren.dm_childEntityIds",
      // "dm_childEntityIds",
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

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const {
    name,
    description,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  return (
    <>
      <PageLayout templateData={{ __meta, document }}>
        <Banner
          name={c_addressRegionDisplayName ? c_addressRegionDisplayName : name}
        />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryStateGrid
            name={
              c_addressRegionDisplayName ? c_addressRegionDisplayName : name
            }
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default State;
