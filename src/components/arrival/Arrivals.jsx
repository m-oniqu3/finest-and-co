import React from "react";
import styled from "./Arrivals.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";

const Arrivals = () => {
  return (
    <Container>
      <section className={styled.arrivals}>
        <figure>
          <img
            src="https://images.pexels.com/photos/6316069/pexels-photo-6316069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A styling kitchen with modern funriture."
          />
        </figure>
        <div className={styled.arrivals__details}>
          <article>
            <Container>
              <h1>New Arrival</h1>
              <div className={styled["arrivals__btn-group"]}>
                <Button className="secondary">Kitchen</Button>
                <Button className="secondary">Ikea</Button>
              </div>

              <p className="text">
                Introducing our new kitchen set, the
                <strong> "Gourmet Collection"</strong>. This luxurious set
                features all the latest in kitchenware, from cookware and
                utensils to appliances and storage solutions. With this set,
                you'll be able to cook like a pro and entertain in style.
              </p>
            </Container>
          </article>
        </div>
      </section>
    </Container>
  );
};

export default Arrivals;
