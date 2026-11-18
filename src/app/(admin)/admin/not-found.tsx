import Link from "next/link";

/** A missing enquiry or conversation, or the whole panel when it is switched off (no ADMIN_PASSWORD). */
export default function AdminNotFound() {
  return (
    <main className="adm-login">
      <div className="adm-login__box">
        <h1 className="adm-h1">Няма такава страница</h1>
        <p className="adm-lead">Записът не съществува или панелът не е включен.</p>
        <Link className="btn btn--sec" href="/">
          Към сайта
        </Link>
      </div>
    </main>
  );
}
