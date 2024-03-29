import React from "react";
import {localization} from "../../../services/localization";
import {FullVacancy, VacancyLevel, VacancySkill, VacancyIndustry, VacancyStack} 
  from "../../../models/vacancy";
import {InlineIcon} from '@iconify/react';
import telegramIcon from '@iconify/icons-mdi/telegram';
import classNames from "classnames";
import {formatSalary} from "../../../utils/formatters/salary";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

const removeSchemaFromUrl =
  (str: string): string => {
    const allowedSchemas = ["http", "https"];

    for (const schema of allowedSchemas) {
      const fullSchema: string = `${schema}://`;
      const candidate: string = str.substr(0, fullSchema.length);

      if (candidate === fullSchema)
        return str.substring(candidate.length);
    }

    return str;
  };

const splitParagraphs =
  (str: string): string[] => {
    const paragraphs: string[] = [];

    str.split("\n").forEach(
      (paragraph: string): void => {
        if (paragraph !== "")
          paragraphs.push(paragraph);
      }
    );

    return paragraphs;
  };


interface FullVacancyLayerProps {
  vacancy: FullVacancy;
}

export const FullVacancyLayer:
React.FunctionComponent<FullVacancyLayerProps> =
  ({ vacancy }: FullVacancyLayerProps): JSX.Element =>
    <div className="vacancyLayer">
      <div className="container">
        <div className="fullVacancy row">
          <div className="col s12">
            <div className={classNames(
              "card-panel",
              "vacancy",
              "full"
            )}>
              <header className="row">
                <div className="col s6 jobTitle">
                  <h5>{VacancySkill[vacancy.skill]}</h5>
                  <p className="secondLine pNoMargin">
                    {VacancyLevel[vacancy.level]}
                  </p>
                </div>
                <div className="col s6">
                  <div className="col s12 colNoSidePadding companyName">
                    <h5 className={classNames([
                      "right pNoMargin",
                      vacancy.company.name.split(" ").reduce(
                        (accumulator: string, word: string) =>
                          accumulator.length < word.length ?
                            word : accumulator,
                        ""
                      ).length > kMaxCompanyWordLength ?
                        "smaller" : ""
                    ])}>{vacancy.company.name}</h5>
                  </div>
                  <div className="col s12 colNoSidePadding industryAndWebsite">
                    <p className="right pNoMargin secondLine">
                      <span className="industry">
                        {VacancyIndustry[vacancy.company.industry]}
                      </span>
                      <span className="website">
                        <a onClick={
                          (): void =>
                            void(open(vacancy.company.website)?.focus())
                        }>
                          {removeSchemaFromUrl(vacancy.company.website)}
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="col s12 colNoSidePadding location">
                    <p className="right pNoMargin secondLine">
                      {`${vacancy.location.city}, ${vacancy.location.country}`}
                    </p>
                  </div>
                </div>
              </header>
              <section className="row details">
                <div className="col s6">
                  <div className="stack">
                    <p>{vacancy.stack.map(key => VacancyStack[key]).join(", ")}</p>
                  </div>
                  <div className="moneySummary">
                  <h6>{`${
                      formatSalary(vacancy.salary.from)
                    } – ${
                      formatSalary(vacancy.salary.to)
                    } $`
                  }</h6>
                  </div>
                </div>
                <div className="col s6 stickToBottom">{
                  vacancy.remote ?
                    <span className="remote">
                      {localization.localize("remote")}
                    </span>
                  : ""
                }</div>
              </section>
              <section className="description">
                {splitParagraphs(vacancy.description).map(
                  (paragraph: string, index: number): JSX.Element =>
                    <p key={
                      `full-vacancy-${vacancy.guid.str}-description-par-${index}`
                    }>{paragraph}</p>
                )}
              </section>
              <a
                className="btn waves-effect"
                onClick={(): void => 
                  void(open(`https://t.me/${vacancy.contact.telegram}`)?.focus())}
              >
                {localization.localize("respondInTelegram")}
                <i className="material-icons left">
                  <InlineIcon icon={telegramIcon} height={23} />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
