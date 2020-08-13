import React from "react";
import {localization} from "../../../services/localization";

import "./styles.scss";



interface MainLayerProps {
  companyLogoSrcs: JSX.Element[]
}

export const MainLayer: React.FunctionComponent<MainLayerProps> =
  (props: MainLayerProps): JSX.Element =>
    <div className="row rowNoBottomMargin mainLayer z-depth-1">
      <div className="container">
        <div className="col s12 l5_5 offset-m1 colNoSidePadding right">
          <h3 className="first mainLayerText">
            {localization.localize("mainLayerTitle")}
          </h3>
          {
            localization.localize("mainLayerParagraphs").map(
              (parapgraph: string, index: number): JSX.Element =>
                <p
                  key = {`main-layer-paragraph-${index}`}
                  className="mainLayerTextDarken"
                >{parapgraph}</p>
            )
          }
          <div className="mainLayerButtons">
            <a className="btn waves-effect">
              {localization.localize("putVacancy")}
              <i className="material-icons left">add</i>
            </a>
            <a className="btn waves-effect btnRight">
              <i className="material-icons left">format_align_justify</i>
              {localization.localize("viewVacancies")}
            </a>
          </div>
        </div>
        <div className="col s12 l5_5 colNoSidePadding left">
          <h3 className="second mainLayerText center">
            {localization.localize("mainLayerCompaniesTitle")}
          </h3>
          <div className="row flex">{
            props.companyLogoSrcs.map(
              (logo: JSX.Element, index: number): JSX.Element =>
                <div
                  className="mainLayerCompanyLogo"
                  key={`main-layer-logo-${index}`}
                >
                  <span></span>
                  {logo}
                </div>
            )
          }</div>
        </div>
      </div>
    </div>;
