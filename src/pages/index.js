import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function TicketingWidget() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initWidget = () => {
      if (
        window.SquadupCheckoutAPI &&
        typeof window.SquadupCheckoutAPI.create === "function"
      ) {
        window.SquadupConfig.setValues({
          title: "SquadUP Events",
          image:
            "https://s3.amazonaws.com/squadup_production/users/logos/005/385/987/original/1_Host_Logo_%281%29.png?1723670538",
          root: "squadup-checkout",
          userId: [5385987],
          title: "Please select your ticket from the options below:",
          shoppingCartEnabled: false,
          brandingPosition: "none",
          ticketGuardianEnabled: false,
          autoScrollElementId: "squadup-checkout",
          topics: ["UntitledMB"],
          flyerList: true,
          descriptionEnabled: true,
          onDomReady: true,
        });

        window.SquadupCheckoutAPI.create("squadup-checkout", {});
        setIsLoading(false);
      } else {
        setTimeout(initWidget, 100); // Retry after 100ms if SquadupCheckoutAPI is not ready
      }
    };

    initWidget();

    return () => {
      if (
        window.SquadupCheckoutAPI &&
        typeof window.SquadupCheckoutAPI.destroy === "function"
      ) {
        window.SquadupCheckoutAPI.destroy("squadup-checkout");
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://embed.squadup.com/default/css/bootstrap-namespace.min.css"
        />
        <script
          src="https://embed.squadup.com/main-v2.5-beta-1.min.js"
          type="text/javascript"
        />
      </Helmet>
      <div className="relative min-h-[400px]">
        <div
          id="squadup-checkout"
          className="opacity-100 transition-opacity duration-300"
        />
      </div>
    </>
  );
}

const SquadUp = () => {
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Ticketing Widget</h1>
      <TicketingWidget />
    </main>
  );
};

export default SquadUp;

export const Head = () => <title>Home Page</title>;
