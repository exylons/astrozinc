import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import InterRegular from "@fontsource/inter/files/inter-latin-400-normal.woff";
import InterBold from "@fontsource/inter/files/inter-latin-700-normal.woff";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

const dimensions = {
  width: 1200,
  height: 630,
};

interface Props {
  title: string;
  pubDate: Date;
}

export async function GET(context: APIContext) {
  const { title, pubDate } = context.props as Props;
  const date = pubDate.toLocaleDateString("en-US", {
    dateStyle: "full",
  });

  const markup = html`<div tw="bg-zinc-900 flex flex-col w-full h-full">
    <svg
      tw="absolute right-18 [transform:translatex(-50%)]"
      width="495"
      height="623"
      viewBox="0 0 495 623"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M167.19 364.254C83.4786 364.254 0 404.819 0 404.819C0 404.819 141.781 19.4876 142.087 18.7291C146.434 7.33701 153.027 0 162.289 0H332.441C341.703 0 348.574 7.33701 352.643 18.7291C352.92 19.5022 494.716 404.819 494.716 404.819C494.716 404.819 426.67 364.254 327.525 364.254L264.41 169.408C262.047 159.985 255.147 153.581 247.358 153.581C239.569 153.581 232.669 159.985 230.306 169.408L167.19 364.254ZM160.869 530.172C160.877 530.18 160.885 530.187 160.894 530.195L160.867 530.181C160.868 530.178 160.868 530.175 160.869 530.172ZM136.218 411.348C124.476 450.467 132.698 504.458 160.869 530.172C160.997 529.696 161.125 529.242 161.248 528.804C161.502 527.907 161.737 527.073 161.917 526.233C165.446 509.895 178.754 499.52 195.577 500.01C211.969 500.487 220.67 508.765 223.202 527.254C224.141 534.12 224.23 541.131 224.319 548.105C224.328 548.834 224.337 549.563 224.347 550.291C224.563 566.098 228.657 580.707 237.264 593.914C245.413 606.426 256.108 615.943 270.749 622.478C270.593 621.952 270.463 621.508 270.35 621.126C270.045 620.086 269.872 619.499 269.685 618.911C258.909 585.935 266.668 563.266 295.344 543.933C298.254 541.971 301.187 540.041 304.12 538.112C310.591 533.854 317.059 529.599 323.279 525.007C345.88 508.329 360.09 486.327 363.431 457.844C364.805 446.148 363.781 434.657 359.848 423.275C358.176 424.287 356.587 425.295 355.042 426.275C351.744 428.366 348.647 430.33 345.382 431.934C303.466 452.507 259.152 455.053 214.03 448.245C184.802 443.834 156.584 436.019 136.218 411.348Z"
        fill="url(#paint0_linear_1805_24383)"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_1805_24383"
          x1="247.358"
          y1="0"
          x2="247.358"
          y2="622.479"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-opacity="0.5"></stop>
          <stop offset="1" stop-opacity="0.2"></stop>
        </linearGradient>
      </defs>
    </svg>

    <div tw="flex flex-col items-center w-full h-4/5 p-10 justify-center mt-9">
      <div tw="text-zinc-400 text-2xl mb-6">${date}</div>
      <div
        tw="flex items-center justify-center text-6xl w-full font-bold leading-snug tracking-tight text-white"
      >
        ${title}
      </div>
      <div tw="flex items-center mt-9">
        <img
          src="https://avatars.githubusercontent.com/u/145350865?s=160"
          tw="w-15 h-15 rounded-full"
        />
        <div tw="flex flex-col ml-4 text-2xl">
          <span tw="text-zinc-400">Lance Ross</span>
          <span tw="text-zinc-400">@exylods</span>
        </div>
      </div>
    </div>
  </div>`;

  const svg = await satori(markup, {
    fonts: [
      {
        name: "Inter",
        data: Buffer.from(InterRegular),
        weight: 400,
      },
      {
        name: "Inter",
        data: Buffer.from(InterBold),
        weight: 700,
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
  });

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: dimensions.width,
    },
  }).render();

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
      props: {
        title: post.data.title,
        pubDate: post.data.updatedDate ?? post.data.pubDate,
      },
    };
  });
  return paths;
}
