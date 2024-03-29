import React from "react";
import {Input} from "../../ui/input";
import {Validator, ValidationError} from "../../../utils/validation/validator";
import {ruleNotEmpty, commonLocalizer}
  from "../../../utils/validation/commonValidators";
import {ruleIsCompany, companyLocalizer} from "./validation/company";
import {ruleIsSite, siteLocalizer} from "./validation/site";
import {localization} from "../../../services/localization";
import {ruleIsSalary, salaryLocalizer, ruleNotLessThan, LessThan}
  from "./validation/salary";
import {VacancyLevel, VacancySkill, FullVacancy, VacancyStack, VacancyIndustry}
  from "../../../models/vacancy";
import classNames from "classnames";
import {localizer, ruleNotShort} from "./validation";
import {ruleIsLocation} from "./validation/location";
import {ruleIsEmail, ruleIsTelegram, ruleIsPhone, contactsLocalizer}
  from "./validation/contacts";
import Materialize from "materialize-css";
import {connection} from "../../../services/api/post_job";
import {fullVacancyToJob} from "../../../models/converters";
import {notifications} from "../../../services/notifications";
import {main} from "../../../services/api/errors/main";
import {Redirect}
  from "react-router-dom";

import "./styles.scss";



type InputValue<T = string> = { value: T, error: boolean };

type PostVacancyFormLayerState = {
  contact: Record<keyof FullVacancy["contact"], InputValue>,
  location: Record<keyof FullVacancy["location"], InputValue>,
  company: Record<
    keyof Omit<FullVacancy["company"], "industry">,
    InputValue
  > & { industry: FullVacancy["company"]["industry"] | null },
  salary: Record<keyof FullVacancy["salary"], InputValue<number>>,
  level: FullVacancy["level"] | null,
  skill: FullVacancy["skill"] | null,
  description: InputValue,
  status: "initial" | "pending" | "success"
} & Pick<FullVacancy, "stack" | "remote">;


export class PostVacancyFormLayer
extends React.Component<{}, PostVacancyFormLayerState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      status: "initial",
      contact: {
        email: {
          value: "",
          error: false
        },
        phone: {
          value: "",
          error: false
        },
        telegram: {
          value: "",
          error: false
        },
      },
      location: {
        country: {
          value: "",
          error: false
        },
        city: {
          value: "",
          error: false
        },
      },
      company: {
        name: {
          value: "",
          error: false
        },
        industry: null,
        website: {
          value: "",
          error: false
        },
      },
      salary: {
        from: {
          value: 0,
          error: false
        },
        to: {
          value: 0,
          error: false
        }
      },
      level: null,
      skill: null,
      stack: [],
      remote: false,
      description: {
        value: "",
        error: false
      }
    };
  }

  public readonly componentDidMount = (): void =>
    this.updateDynamicContent();

  private updateDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll<HTMLSelectElement>(
        "select.postVacancyFormSelect"
      )];

    selects.map(
      (el: HTMLSelectElement) =>
        Materialize.FormSelect.getInstance(el)
    ).forEach(
      (el: Materialize.FormSelect, index: number): void => {
        if (el === undefined)
          Materialize.FormSelect.init(selects[index]);
      }
    );
  }

  private readonly handleStackChange =
    (options: HTMLCollectionOf<HTMLOptionElement>): void =>
      this.setState({
        stack:
          [... options]
            .filter(
              (option: HTMLOptionElement): boolean =>
                option.value !== ""
            ).map(
              (option: HTMLOptionElement): keyof typeof VacancyStack =>
                option.value as keyof typeof VacancyStack
            )
      });

  private readonly isButtonDisabled =
    (): boolean =>
      this.state.status === "pending" ||
      this.state.company.name.error ||
      this.state.company.industry === null ||
      this.state.company.website.error ||
      this.state.location.country.error ||
      this.state.location.city.error ||
      this.state.skill === null ||
      this.state.level === null ||
      this.state.stack.length < 1 ||
      this.state.salary.from.error ||
      this.state.salary.to.error ||
      this.state.description.error ||
      this.state.contact.email.error ||
      this.state.contact.telegram.error ||
      this.state.contact.phone.error;

  public readonly getForm =
    (): JSX.Element =>
      <div className="container postVacancyForm">
        <section className="row">
          <div className="col s12 l3 header">
            <h5>{localization.localize("company")}</h5>
            <p className="pNoMargin hide-on-med-and-down">
              {localization.localize("vacancyPostFormCompanyDescription")}
            </p>
          </div>
          <div className="col s12 l9 form">
            <div className="col s12 colNoSidePadding">
              <Input
                title={localization.localize("companyName")}
                id="post-vacancy-form-company-name"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      company: {
                        ... state.company,
                        name: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s12 m6 left">
              <select
                value={
                  this.state.company.industry !== null ?
                  this.state.company.industry : ""
                }
                className="postVacancyFormSelect"
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void => {
                    const industry: keyof typeof VacancyIndustry | null =
                      event.target.value !== "" ?
                      event.target.value as keyof typeof VacancyIndustry:
                      null
                    
                    this.setState(
                      state => ({
                        company: {
                          ... state.company,
                          industry
                        }
                      })
                    )
                  }
                }
              >
                <option
                  value=""
                  disabled
                >{localization.localize("companyIndustry")}</option>
                {
                  (Object.keys(VacancyIndustry) as (keyof typeof VacancyIndustry)[])
                    .map(
                      (key: keyof typeof VacancyIndustry): JSX.Element =>
                        <option
                          value={key}
                          key={`post-vacancy-form-industry-option-${key}`}
                        >{VacancyIndustry[key]}</option>
                    )
                }
              </select>
            </div>
            <div className="col s12 m6 right">
              <Input
                title={localization.localize("companyWebsite")}
                id="post-vacancy-form-company-website"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSite
                  ], [
                    commonLocalizer,
                    siteLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      company: {
                        ... state.company,
                        website: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s12 m6 left">
              <Input
                title={localization.localize("locationCountry")}
                id="post-vacancy-form-location-country"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsLocation
                  ], [
                    commonLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      location: {
                        ... state.location,
                        country: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s12 m6 right">
              <Input
                title={localization.localize("locationCity")}
                id="post-vacancy-form-location-city"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsLocation
                  ], [
                    commonLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      location: {
                        ... state.location,
                        city: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <label htmlFor="post-vacancy-form-location-remote">
              <input
                type="checkbox"
                id="post-vacancy-form-location-remote"
                checked={this.state.remote}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>): void =>
                    this.setState({
                      remote: event.target.checked
                    })
                }
              />
              <span>{localization.localize("remote")}</span>
            </label>
          </div>
        </section>
        <section className="row">
          <div className="col s12 l3 header">
            <h5>{localization.localize("candidate")}</h5>
            <p className="pNoMargin hide-on-med-and-down">
              {localization.localize("vacancyPostFormCandidateDescription")}
            </p>
          </div>
          <div className="col s12 l9 form">
            <select
              value={this.state.skill !== null ? this.state.skill : ""}
              className="postVacancyFormSelect"
              onChange = {
                (event: React.ChangeEvent<HTMLSelectElement>): void =>
                  this.setState({
                    skill:
                      event.target.value !== "" ?
                      event.target.value as keyof typeof VacancySkill :
                      null
                  })
              }
            >
              <option value="" disabled>
                {localization.localize("candidateSkill")}
              </option>
              {
                (Object.keys(VacancySkill) as (keyof typeof VacancySkill)[]).map(
                  (key: keyof typeof VacancySkill): JSX.Element =>
                    <option
                      value={key}
                      key={`post-vacancy-form-skill-option-${key}`} 
                    >{VacancySkill[key]}</option>
                )
              }
            </select>
            <div className="col s6 left always-half">
              <select
                value={this.state.level !== null ? this.state.level : ""}
                className="postVacancyFormSelect"
                id="post-vacancy-form-candidate-level"
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void =>
                    this.setState({
                      level:
                        event.target.value !== "" ?
                        event.target.value as keyof typeof VacancyLevel :
                        null
                    })
                }
              >
                <option value="" disabled>
                  {localization.localize("candidateLevel")}
                </option>
                {
                  (Object.keys(VacancyLevel) as (keyof typeof VacancyLevel)[]).map(
                    (key: keyof typeof VacancyLevel): JSX.Element =>
                      <option
                        value={key}
                        key={`post-vacancy-form-level-option-${key}`} 
                      >{VacancyLevel[key]}</option>
                  )
                }
              </select>
            </div>
            <div className="col s6 right always-half">
              <select
                className="postVacancyFormSelect"
                multiple
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void =>
                    this.handleStackChange(event.target.selectedOptions)
                }
                value={["", ... this.state.stack]}
              >
                <option
                  value=""
                  disabled
                >{localization.localize("candidateStack")}</option>
                {
                  (Object.keys(VacancyStack) as (keyof typeof VacancyStack)[]).map(
                    (key: keyof typeof VacancyStack): JSX.Element =>
                      <option
                        value={key}
                        key={`post-vacancy-form-stack-option-${key}`} 
                      >{VacancyStack[key]}</option>
                  )
                }
              </select>
            </div>
          </div>
        </section>
        <section className="row">
          <div className="col s12 l3 header">
            <h5>{localization.localize("offer")}</h5>
            <p className="pNoMargin hide-on-med-and-down">
              {localization.localize("vacancyPostFormOfferDescription")}
            </p>
          </div>
          <div className="col s12 l9 form">
            <div className="col s6 left always-half">
              <Input
                title={localization.localize("salaryFrom")}
                id="post-vacancy-form-salary-from"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSalary
                  ], [
                    commonLocalizer,
                    salaryLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      salary: {
                        ... state.salary,
                        from: { value: parseInt(value, 10), error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 right always-half">
              <Input
                title={localization.localize("salaryTo")}
                id="post-vacancy-form-salary-to"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSalary,
                    ruleNotLessThan(this.state.salary.from.value)
                  ], [
                    commonLocalizer,
                    salaryLocalizer
                  ], (errors: ValidationError[]): ValidationError => {
                    const found = errors.find(e => e instanceof LessThan);
                    if (found !== undefined)
                      return found;
                    else return errors[0];
                  })
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      salary: {
                        ... state.salary,
                        to: { value: parseInt(value, 10), error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s12">
              <div className="input-field">
                <Input
                  title={localization.localize("description")}
                  id="post-vacancy-form-description"
                  type="textarea"
                  changeCallback={
                    (value: string, error: ValidationError | null): void =>
                      this.setState({
                        description: {
                          value,
                          error: error !== null
                        }
                      })
                  }
                  validator={new Validator([ruleNotEmpty], [commonLocalizer])}
                />
              </div>
            </div>
            <div className="col s12">
              <Input
                title={localization.localize("contactsEmail")}
                id="post-vacancy-form-contacts-email"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsEmail
                  ], [
                    commonLocalizer,
                    contactsLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      contact: {
                        ... state.contact,
                        email: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 left">
              <Input
                title="Telegram"
                id="post-vacancy-form-contacts-telegram"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleNotShort,
                    ruleIsTelegram
                  ], [
                    localizer,
                    commonLocalizer,
                    contactsLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      contact: {
                        ... state.contact,
                        telegram: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 right">
              <Input
                title={localization.localize("contactsPhone")}
                id="post-vacancy-form-contacts-phone"
                type="input-text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsPhone
                  ], [
                    commonLocalizer,
                    contactsLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      contact: {
                        ... state.contact,
                        phone: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
        <section className="row post">
          <div className="col s12 l3 header">
          </div>
          <div className="col s12 l9 form">
            <a
              className={classNames([
                "btn-large",
                "waves-effect",
                "col s12",
                this.isButtonDisabled() ? "disabled" : ""
              ])}
              onClick={
                (): void => this.setState(
                  { status: "pending" },
                  () => connection.send(
                    fullVacancyToJob({
                      premium: false,
                      contact: {
                        email: this.state.contact.email.value,
                        phone: this.state.contact.phone.value,
                        telegram: this.state.contact.telegram.value
                      },
                      location: {
                        country: this.state.location.country.value,
                        city: this.state.location.city.value
                      },
                      company: {
                        name: this.state.company.name.value,
                        industry: this.state.company.industry!,
                        website: this.state.company.website.value
                      },
                      salary: {
                        from: this.state.salary.from.value,
                        to: this.state.salary.to.value
                      },
                      level: this.state.level!,
                      skill: this.state.skill!,
                      stack: this.state.stack,
                      remote: this.state.remote,
                      description: this.state.description.value
                    })
                  ).then(() => this.setState(
                    { status: "success" },
                    () => notifications.notify({
                      type: "success",
                      title: localization.localize("postJobSuccessTitle"),
                      message: localization.localize("postJobSuccessMessage")
                    })
                  )).catch(() => this.setState(
                    { status: "initial" },
                    () => notifications.notify(main)
                  ))
                )
              }
            >{localization.localize("postVacancy")}</a>
          </div>
        </section>
      </div>;

      public readonly render = (): JSX.Element =>
        this.state.status === "success" ? <Redirect to = "/"/> : this.getForm()
};
