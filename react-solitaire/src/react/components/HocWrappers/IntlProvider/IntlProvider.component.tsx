import { ExplicitAny, RootReducerState } from "../../../../global";
import React, { PropsWithChildren, memo } from "react";
import { IntlProvider } from "react-intl";
import enUSIntl from "../../Languages/en-US.json";
import esESIntl from "../../Languages/es-ES.json";
import ptPTIntl from "../../Languages/pt-PT.json";
import { useSelector } from "react-redux";

function TranslatorIntlProvider({ children }: PropsWithChildren<{}>) {
  const language = useSelector(
    ({ User }: RootReducerState) =>
      (User.settings.language as string) || "en-US"
  );

  const messages: ExplicitAny = {
    en: enUSIntl,
    pt: ptPTIntl,
    es: esESIntl
  };

  const finalLanguage = language.split("-")[0]; // language without region code

  return (
    <IntlProvider locale={finalLanguage} messages={messages[finalLanguage]}>
      {children}
    </IntlProvider>
  );
}

export default memo(TranslatorIntlProvider);
