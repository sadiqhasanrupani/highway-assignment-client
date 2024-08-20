import getUserDetailHandler from "@/http/get";
import { UserDetailPayload } from "@/types";
import { classNames, HttpError } from "@/utils";
import { getAuthToken, removeAuthToken } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Menu, X } from "lucide-react";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { TextEffect } from "@/core/text-effect";
import LoadingTextLoop from "@/components/loaders/loading-text-loop";

export default function RootLayout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [animationComplete, setAnimationComplete] = React.useState(false);

  const handleFirstAnimationComplete = () => {
    setAnimationComplete(true);
  };

  const {
    data: getUserData,
    isLoading: getUserIsLoading,
    isError: getUserIsError,
    error: getUserError,
  } = useQuery<UserDetailPayload, HttpError>({
    queryKey: ["get-user-detail", { navigate }],
    queryFn: getUserDetailHandler,
    gcTime: 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    const authToken = getAuthToken();

    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (getUserIsError) {
      if (getUserError.code === 401) {
        navigate("/login");
      }
    }

    // eslint-disable-next-line
  }, [getUserIsError, getUserError]);

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Update Password", to: "/update-password" },
  ];

  return (
    <main>
      {getUserIsLoading ? (
        <LoadingTextLoop />
      ) : (
        <section className="flex flex-col gap-10 lg:py-2">
          <header className="bg-white">
            <nav
              className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <div>
                  <span className="text-primary">Highway</span>
                  <span className="text-danger">{" Assignment"}</span>
                </div>
              </a>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "underline text-primary"
                          : "hover:underline hover:text-primary",
                        "text-base font-medium leading-6 text-gray-900 ",
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <Link
                  to="/login"
                  className="text-base font-medium leading-6 text-gray-900 flex items-center gap-2 hover:underline"
                  onClick={() => removeAuthToken()}
                >
                  <span>Log out</span>
                  <span>
                    <LogOut className="w-4 text-danger" />
                  </span>
                </Link>
              </div>
            </nav>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-10" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <div>
                      <span className="text-primary">Highway</span>
                      <span className="text-danger">{" Assignment"}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "underline text-primary"
                                : "hover:underline hover:text-primary",
                              "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                            )
                          }
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                    <div className="py-6">
                      <Link
                        to={"/login"}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          removeAuthToken();
                          navigate("/login");
                        }}
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
          <div className="flex justify-center px-4 items-center text-3xl font-bold lg:text-5xl container w-full">
            <h1 className="flex text-base lg:text-5xl md:gap-2">
              <TextEffect
                as="span"
                preset="blur"
                per="char"
                onAnimationComplete={handleFirstAnimationComplete}
                className="text-primary"
              >
                Welcome
              </TextEffect>
              <TextEffect
                as="span"
                preset="blur"
                per="char"
                className="text-danger"
              >
                {` ${getUserData?.userDetail.fullname || ""} !`}
              </TextEffect>
              {animationComplete ? (
                <TextEffect className="hidden md:block" preset="shake">
                  👋🏻
                </TextEffect>
              ) : (
                <span className="hidden md:block">{"👋🏻"}</span>
              )}
            </h1>
          </div>

          <Outlet />
        </section>
      )}
    </main>
  );
}
