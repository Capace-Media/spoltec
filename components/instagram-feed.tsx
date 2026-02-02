import Image from "next/image";

interface ImageSize {
    mediaUrl: string;
    width: number;
    height: number;
}

interface InstagramPost {
    id: string;
    permalink: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    caption: string;
    sizes: {
        small: ImageSize;
        medium: ImageSize;
        large: ImageSize;
        full: ImageSize;
    };
    colorPalette: {
        dominant: string;
        muted: string;
    };
}

interface InstagramFeedResponse {
    posts: InstagramPost[];
}

export default async function InstagramFeed(): Promise<React.ReactElement | null> {
    const url = process.env.INSTAGRAM_FEED_URL;

    if (!url) {
        return null;
    }

    const response = await fetch(url, {
        next: {
            revalidate: 3600,
            tags: ["instagram-feed"],
        },
    });

    if (!response.ok) {
        return null;
    }

    const data: InstagramFeedResponse = await response.json();

    if (!data?.posts?.length) {
        return null;
    }

    return (
        <section className="contain-outer section">
            <h2>Instagram</h2>
            <p className="mb-2">Följ oss på Instagram för att se våra senaste projekt och tips!</p>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.posts.map((post) => (
                    <li key={post.id}>
                        <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="group relative block aspect-square overflow-hidden rounded-xl"
                        >
                            <Image
                                src={post.sizes.medium.mediaUrl}
                                alt={post.caption || "Instagram post"}
                                width={post.sizes.medium.width}
                                height={post.sizes.medium.height}
                                sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, (max-width: 1400px) 23vw, 320px"
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="rgb(${post.colorPalette.muted})" width="1" height="1"/></svg>`
                                ).toString("base64")}`}
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                <svg
                                    className="h-10 w-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}