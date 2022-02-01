import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './Quotes.css';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const QuotesLayout: FunctionComponent<QuotesProps> = ({ history }) => {
 
  return (
    <section className="text-white main-section overflow-auto">
      QUOTES
    </section>

  );
};

export const Quotes = withRouter(QuotesLayout);
