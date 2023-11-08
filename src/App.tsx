import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "./Layout";
import { Comments } from "./comments/Comments";
import { seedData } from "./api/comments";

const queryClient = new QueryClient();

seedData();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Comments />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
