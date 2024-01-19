import Header from "./Header";
import Footer from "./Footer";
import { AnalyticsProvider, AnalyticsScopeProvider } from "@yext/pages-components";
import { TemplateProps } from "@yext/pages";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: any;
  templateData?: TemplateProps;
}

const PageLayout = ({ children, _site, templateData }: PageLayoutProps) => {
  if (!templateData) {
    return (
      <div className="min-h-screen">
        <Header _site={_site} />
        {children}
        <Footer _site={_site} />
      </div>
    )
  }

  return (
    <AnalyticsProvider templateData={templateData}>
      <div className="min-h-screen">
        <AnalyticsScopeProvider name="header">
          <Header _site={_site} />
        </AnalyticsScopeProvider>
        {children}
        <AnalyticsScopeProvider name="footer">
          <Footer _site={_site} />
        </AnalyticsScopeProvider>
      </div>
    </AnalyticsProvider>
  );
};

export default PageLayout;
