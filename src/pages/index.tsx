import Head from "next/head";
import AuditForm from "../components/AuditFrom";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Audit</title>
        <meta
          name="description"
          content="AI-powered smart contract audit tool"
        />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-bloack">
        <AuditForm />
      </main>
    </div>
  );
}
