import CollapsibleChecklists from "./modules/CollapsibleChecklists";
import Form from "./modules/Form";
import RadioToggles from "./modules/RadioToggles";
import PulsingInputs from "./modules/PulsingInputs";
import TagSetSelects from "./modules/TagSetSelect";
import TagSection from "./modules/TagSection";

new Form();
new RadioToggles();
new TagSection(document.querySelector(".genderFields > .tag-box"));
new PulsingInputs(".checkbox");
new PulsingInputs(".btn--add");
new CollapsibleChecklists();
new TagSetSelects();