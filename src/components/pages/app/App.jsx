import { AppRouter } from "../../../routers/AppRouter";
import { PageLogaut } from "../../templates/page-logaut";

export const App = () => {
  return (
    <PageLogaut>
      <AppRouter/>
    </PageLogaut>
  );
}
