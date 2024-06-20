import { Link } from "react-router-dom";
// import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import spotify_white from "../components/assets/logo/spotify_white.svg";
import styles from "./style.module.scss";

const navLinks = [
  { name: "Premium", link: "#" },
  { name: "Support", link: "#" },
  { name: "Download", link: "#" },
];

const navLinks2 = [
  { name: "Sign up", link: "/signup" },
  { name: "Log in", link: "/login" },
];

const companyLInks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
  "For Artists",
  "Developers",
  "Advertising",
  "Investors",
  "Vendors",
];

const usefulLInks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
  "legal",
  "privacy center",
  "privacy policy",
  "Cookies",
  "About ads",
  "Additional CA Privacy Disclosures",
];

const footerIcons = [<InstagramIcon />, <XIcon />, <FacebookIcon />];

const Main = () => {
  return (
    <div className=" w-full h-full">
      <div className={`${styles.container}`}>
        <div className={styles.navbar_container}>
          <Link to="#" className={styles.nav_logo}>
            <img src={spotify_white} alt="logo" />
          </Link> 
          <div className={styles.nav_links}>
            {navLinks.map((link, index) => (
              <Link key={index} to={link.link} className={styles.links}>
                {link.name}
              </Link>
            ))}

            {
              navLinks2.map((link, index) => (
                <Link key={index} to={link.link} className={` bg-white h-full  px-5 rounded-md font-semibold m-1  text-xl text-black ${styles.link}`}>
                  {link.name}
                </Link>
              ))
            }
          </div>
        </div>
        <div className={styles.main_container}>
          <div className={styles.main}>
            <h1>Listening is everything</h1>
            <p>Millions of songs and podcasts. No credit card needed.</p>
          </div>
        </div>


        {/* <div className={`${styles.footer_container}`}>
				<div className={styles.footer_1}>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Company</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Communities</div>
						{communitiesLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Useful links</div>
						{usefulLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.footer_2_links}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2024 Spotify</span>
					</div>
				</div>
			</div> */}
      </div>
    </div>
  );
};

export default Main;
