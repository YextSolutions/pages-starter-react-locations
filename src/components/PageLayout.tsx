import Header from "./Header";
import Footer from "./Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages-components";
import { TemplateProps } from "@yext/pages";

export interface PageLayoutProps {
  children?: React.ReactNode;
  templateData: TemplateProps;
}

const PageLayout = ({ children, templateData }: PageLayoutProps) => {
  return (
    <AnalyticsProvider
      apiKey={YEXT_PUBLIC_EVENTS_API_KEY}
      templateData={templateData}
      currency="USD"
      productionDomains={[YEXT_PUBLIC_PROD_DOMAIN]}
      enableDebugging={true}
    >
      <div className="min-h-screen">
        <AnalyticsScopeProvider name="header">
          <Header />
        </AnalyticsScopeProvider>
        {children}
        <AnalyticsScopeProvider name="footer">
          <Footer />
        </AnalyticsScopeProvider>
      </div>
    </AnalyticsProvider>
  );
};

export default PageLayout;
