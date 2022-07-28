import Link from 'next/link'

const Header = () => {
  return (
    <header>
        <div>
            <Link href="/">
                <p>Blogsite</p>
            </Link>
        </div>
    </header>
  )
}

export default Header