import { CONFIG } from "../data/site";
import { useApp, waLink } from "../context";
import { Icon } from "../hooks";

export function Footer() {
  const { t } = useApp();
  const addr = CONFIG.address.replace(/^Pak Services, /, "");
  return (
    <footer className="foot2">
      <div className="container fgrid">
        <div className="fbrand">
          <a href="#top" className="flogo" aria-label="Pak Services home"><img src="/assets/logo.jpg" alt="" width={116} height={116} /></a>
          <p className="fname">Pak Services</p>
          <p>{t("foot_tag")}</p>
        </div>

        <div>
          <h4>{t("nav_contact")}</h4>
          <p>{addr}</p>
          <p dir="ltr"><a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.displayPhone}</a></p>
          <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
        </div>

        <div>
          <h4>{t("foot_links")}</h4>
          <a href="#services">{t("nav_services")}</a>
          <a href="#how">{t("nav_how")}</a>
          <a href="#work">{t("nav_work")}</a>
          <a href="#membership">{t("nav_membership")}</a>
          <a href="#tools">{t("nav_tools")}</a>
          <a href="#faq">{t("nav_faq")}</a>
          <a href={CONFIG.membershipForm} target="_blank" rel="noopener">{t("mem_form")}</a>
          <a href={CONFIG.affiliationForm} target="_blank" rel="noopener">{t("aff_form")}</a>
        </div>

        <div>
          <h4>{t("foot_follow")}</h4>
          <a className="fsoc" href={CONFIG.facebook} target="_blank" rel="noopener"><Icon id="fb" className="" />Facebook</a>
          <a className="fsoc" href={CONFIG.instagram} target="_blank" rel="noopener"><Icon id="ig" className="" />Instagram</a>
          <a className="fsoc" href={waLink("Assalam o Alaikum!")} target="_blank" rel="noopener"><Icon id="wa" className="" />WhatsApp</a>
          <a className="fsoc" href={CONFIG.channel} target="_blank" rel="noopener"><Icon id="wa" className="" />{t("chan")}</a>
        </div>
      </div>

      <div className="container fbar">
        <span>www.thepakservices.com</span>
        <img src="/assets/logo.jpg" alt="" width={40} height={40} />
        <span>© {new Date().getFullYear()} Pak Services. {t("rights")}</span>
      </div>
    </footer>
  );
}

export function Fabs() {
  return (
    <>
      <a className="fab call" href={`tel:${CONFIG.phoneTel}`} aria-label="Call Pak Services"><svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg></a>
      <a className="fab" href={waLink("Assalam o Alaikum! I need help with a service.")} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><use href="#wa" /></svg></a>
    </>
  );
}
