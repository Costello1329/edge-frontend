import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch, RouteComponentProps}
  from "react-router-dom";
import telegramIcon from '@iconify/icons-mdi/telegram';
import {Header} from "../bars/header";
import {Footer} from "../bars/footer";
import {preferences} from "../../services/preferences";
import {localization} from "../../services/localization";
import {LocaleType} from "../../services/localization/locales";
import {Dropdown} from "../ui/dropdown";
import {HomePage} from "../pages/home";
import {VacanciesPage} from "../pages/vacancies";
import {VacancyPage} from "../pages/vacancy";
import {PostVacancyPage} from "../pages/postVacancy";
import {Guid} from "../../utils/guid";
import Materialize from "materialize-css";

import "./styles.scss";



export class App extends React.Component {
  public readonly componentDidMount = (): void =>
    void(Materialize.Dropdown.init(document.querySelectorAll('.dropdown-trigger')));

  public readonly render = (): JSX.Element =>
    <Router>
      <Dropdown
        id="dropdown-lang"
        options={[{
          text: localization.localize("russian"),
          callback: (): void => localization.setLocale(LocaleType.ru_RU)
        }, {
          text: localization.localize("english"),
          callback: (): void => localization.setLocale(LocaleType.en_GB)
        }]}
      />
      <Header
        icons={[{
          /// telegramIcon package has not been updated
          /// yet for new IconofyIcon support.
          data: { icon: telegramIcon as any, height: 29 },
          callback: (): void => void(window.open(preferences.telegramGroup)),
          dataTarget: undefined,
          class: undefined
        }, {
          data: "language",
          callback: (): void => {},
          dataTarget: "dropdown-lang",
          class: "dropdown-trigger"
        }]}
      />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route exact path="/jobs">
            <VacanciesPage/>
          </Route>
          <Route exact path="/post_job">
            <PostVacancyPage/>
          </Route>
          <Route
            path={"/jobs/:str"}
            exact
            component={
              (innerProps: RouteComponentProps<{ str: string }>): JSX.Element => {
                try {
                  return <VacancyPage vacancyGuid={
                    new Guid(innerProps.match.params.str)
                  }/>;
                } catch (_) {
                  return <Redirect to="/"/>;
                }
              }
            }
          />
          <Redirect to = "/"/>
        </Switch>
      </main>
      <Footer/>
    </Router>
}
