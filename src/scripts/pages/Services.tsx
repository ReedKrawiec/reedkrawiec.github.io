import * as React from 'react';
import TyperWrapper from "../components/typer"
import {Page} from "../helpers";

const Services =  {
        content: (
          <div>
            <div className="placeholder"></div>
            <div className="page__info">
              <section className="info__section info__bio">
                <div className="info__header">s
                  About me
                </div>
              </section>
              <section className="info__section info__languages">
                <div className="info__header">
                  Languages
                </div>
              </section>
              <section className="info__section info__tools">
                <div className="info__header">
                  Tools
                </div>
              </section>
            </div>
          </div>
        ),
        title: "Services",
        navclass: "page__navbar--brown"
      }

export default Services;
      
    