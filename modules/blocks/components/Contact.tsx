import { Phone, Mail, Address } from "../../../components/icons"

const Contact = () => {
    return (
        <section className='contain-outer'>
            <div
                className={`section`}
            >
                <div className='contain'>
                    <div className="flex flex-col items-center justify-center mb-10">
                        <h2>Kontakta oss</h2>

                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
                            <Phone />
                            <p className="font-semibold">040 - 47 40 12</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
                            <Mail />
                            <p className="font-semibold">info@spoltec.se</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
                            <Address />
                            <p className="font-semibold text-center">Grävmaskinsvägen 2, <br />241 38 Eslöv</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;