"use client";

import { useState } from "react";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import {
    ACCEPTED_CV_TYPES,
    applicationFormSchema,
    type TApplicationFormSchema,
} from "@lib/types/application";
import useAppForm from "@components/form/useAppForm";
import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";

interface ApplicationFormProps {
    /** Job title, sent along so the email says which opening it concerns. */
    position: string;
    positionUrl: string;
}

export default function ApplicationForm(props: ApplicationFormProps) {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            linkedin: "",
            cv: null,
            position: props.position,
            positionUrl: props.positionUrl,
            website: "",
        } as TApplicationFormSchema,
        validators: {
            onSubmit: applicationFormSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const { cv, ...fields } = applicationFormSchema.parse(value);

                // Multipart so the CV can travel as a real file and be attached
                // to the email instead of being inlined as a link.
                const body = new FormData();
                body.append("payload", JSON.stringify(fields));
                if (cv) body.append("cv", cv);

                const response = await fetch("/api/job-application", {
                    method: "POST",
                    body,
                });

                if (!response.ok) {
                    setStatus("error");
                    return;
                }

                setStatus("success");
            } catch (error) {
                console.error("Application submission error:", error);
                setStatus("error");
            }
        },
    });

    return (
        <section className="contain-outer section" id="ansok">
            <Card className="max-w-175 bg-[hsl(0,0%,98%)]">
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-2xl">Ansök till {props.position}</h2>
                    </CardTitle>
                    <CardDescription>
                        Fyll i formuläret så hör vi av oss. Urval sker löpande.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {status === "success" ? (
                        <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                            <CheckCircle2
                                className="mt-0.5 size-5 shrink-0 text-green-600"
                                aria-hidden="true"
                            />
                            <div>
                                <h3 className="text-sm font-medium text-green-800">
                                    Tack för din ansökan!
                                </h3>
                                <p className="mt-1 text-sm text-green-700">
                                    Vi har tagit emot din ansökan till {props.position} och
                                    återkommer så snart vi kan.
                                </p>
                            </div>
                        </div>
                    ) : status === "error" ? (
                        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                            <TriangleAlert
                                className="mt-0.5 size-5 shrink-0 text-red-500"
                                aria-hidden="true"
                            />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">
                                    Vi kunde inte skicka din ansökan
                                </h3>
                                <p className="mt-1 text-sm text-red-700">
                                    Försök igen, eller mejla oss direkt på{" "}
                                    <a className="underline" href="mailto:info@spoltec.se">
                                        info@spoltec.se
                                    </a>
                                    .
                                </p>
                                <Button
                                    className="mt-3"
                                    variant="outline"
                                    onClick={() => setStatus("idle")}
                                >
                                    Försök igen
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-4"
                        >
                            <form.AppField name="name">
                                {(field) => (
                                    <field.TextField
                                        label="Ditt fullständiga namn"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Anna Andersson"
                                    />
                                )}
                            </form.AppField>

                            <div className="flex flex-col gap-4 md:w-full md:flex-row">
                                <form.AppField name="phone">
                                    {(field) => (
                                        <field.TextField
                                            label="Telefonnummer"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="070-070 70 70"
                                        />
                                    )}
                                </form.AppField>
                                <form.AppField name="email">
                                    {(field) => (
                                        <field.TextField
                                            label="E-postadress"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="anna.andersson@email.com"
                                        />
                                    )}
                                </form.AppField>
                            </div>

                            <form.AppField name="cv">
                                {(field) => (
                                    <field.FileField
                                        label="Bifoga ditt CV"
                                        name="cv"
                                        accept={ACCEPTED_CV_TYPES.join(",")}
                                        description="PDF eller Word, högst 4 MB."
                                        optional={true}
                                    />
                                )}
                            </form.AppField>

                            <form.AppField name="linkedin">
                                {(field) => (
                                    <field.TextField
                                        label="Länk till LinkedIn"
                                        name="linkedin"
                                        type="url"
                                        optional={true}
                                        placeholder="https://www.linkedin.com/in/..."
                                    />
                                )}
                            </form.AppField>

                            <form.AppField name="message">
                                {(field) => (
                                    <field.TextareaField
                                        label="Berätta kort om dig själv"
                                        name="message"
                                        placeholder="Hej! Jag söker tjänsten för att..."
                                    />
                                )}
                            </form.AppField>

                            <form.AppField name="website">
                                {(field) => (
                                    <field.TextField
                                        label="Webbplats"
                                        name="website"
                                        type="text"
                                        placeholder="https://www.example.com"
                                        hidden={true}
                                        labelHidden={true}
                                        optional={true}
                                    />
                                )}
                            </form.AppField>

                            <p className="text-sm text-muted-foreground">
                                Din ansökan skickas till oss märkt{" "}
                                <strong>{props.position}</strong>.
                            </p>

                            <form.AppForm>
                                <form.SubmitButton className="w-full md:w-auto">
                                    Skicka ansökan
                                </form.SubmitButton>
                            </form.AppForm>
                        </form>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
