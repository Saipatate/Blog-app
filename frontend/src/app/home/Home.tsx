import { styled } from "@stitches/react"
import { ArticleDetails } from "./components/ArticleDetails"

export const Home: React.FC = () => {
    return (
        <Section>
            <ArticleDetails />
        </Section>
    )
}

const Section = styled("section", {
    padding: "50px 5%"
})