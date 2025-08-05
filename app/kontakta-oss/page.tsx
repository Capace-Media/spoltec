import { getPage } from "@lib/data/page";

import Blocks from "components/flexible-content/block";
import { Contact } from "components/flexible-content/sections";

const KontaktaOssPage = async () => {
  const page = await getPage("/kontakta-oss");

  return (
    <div key={`kontakta-oss`}>
      <div className="contain-outer">
        <div className="bg-section">
          <div className="mt-24 text-center contain">
            <h1>Kontakta oss</h1>
          </div>
        </div>
      </div>
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div id="">
        <Contact />
        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </div>
    </div>
  );
};

export default KontaktaOssPage;
